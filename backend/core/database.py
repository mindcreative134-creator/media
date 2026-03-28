from motor.motor_asyncio import AsyncIOMotorClient
import os

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def connect_to_mongo():
    # Use environment variable for MongoDB URI
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    db.client = AsyncIOMotorClient(mongodb_uri)
    print("Connected to MongoDB")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("Closed MongoDB connection")

def get_database():
    return db.client.smmf_db
