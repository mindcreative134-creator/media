from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from core.scraper import MediaFetcher
from pydantic import BaseModel
from core.database import connect_to_mongo, close_mongo_connection, get_database
from core.auth import validate_api_key, get_password_hash, authenticate_user, create_access_token
from typing import Optional, List
from datetime import datetime, timedelta
import secrets

app = FastAPI(title="SMMF API")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fetcher = MediaFetcher()

class FetchRequest(BaseModel):
    url: str

class UserRegister(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

@app.get("/")
async def root():
    return {"message": "SMMF API is running"}

@app.post("/register")
async def register(user: UserRegister):
    db = get_database()
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = {
        "email": user.email,
        "hashed_password": hashed_password,
        "full_name": user.full_name,
        "plan": "free",
        "created_at": datetime.utcnow()
    }
    await db.users.insert_one(new_user)
    return {"message": "User registered successfully"}

@app.post("/login")
async def login(user: UserLogin):
    authenticated_user = await authenticate_user(user.email, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": authenticated_user["email"]})
    return {"access_token": access_token, "token_type": "bearer", "user": {"email": authenticated_user["email"], "full_name": authenticated_user.get("full_name"), "plan": authenticated_user.get("plan")}}

@app.post("/fetch")
async def fetch_media(
    request: FetchRequest,
    x_api_key: Optional[str] = Header(None)
):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    # Optional API Key validation
    user_context = None
    if x_api_key:
        user_context = await validate_api_key(x_api_key)
    
    result = await fetcher.fetch_metadata(request.url)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    # Record in logs if database is connected
    try:
        db = get_database()
        await db.logs.insert_one({
            "url": request.url,
            "platform": result.get("platform", "Unknown"),
            "title": result.get("title", "Unknown"),
            "thumbnail": result.get("thumbnail"),
            "user_email": user_context["user_email"] if user_context else "anonymous",
            "timestamp": datetime.utcnow()
        })
    except Exception as e:
        print(f"Log error: {e}")
    
    return result

@app.post("/api-key/generate")
async def generate_new_key(email: str):
    db = get_database()
    new_key = f"sk_live_{secrets.token_hex(16)}"
    api_key_doc = {
        "key": new_key,
        "user_email": email,
        "name": "General Key",
        "usage_limit": 100,
        "current_usage": 0,
        "is_active": True,
        "created_at": datetime.utcnow()
    }
    await db.apikeys.insert_one(api_key_doc)
    return {"key": new_key}

@app.get("/history")
async def get_history(email: str):
    db = get_database()
    logs = await db.logs.find({"user_email": email}).sort("timestamp", -1).to_list(100)
    for log in logs:
        log["_id"] = str(log["_id"])
    return logs

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
