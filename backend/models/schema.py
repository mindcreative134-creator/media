from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str
    is_active: bool = True
    plan: str = "free"  # free, premium
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class MediaFormat(BaseModel):
    format_id: Optional[str]
    ext: str
    resolution: Optional[str]
    filesize: Optional[int]
    url: str
    vcodec: Optional[str]
    acodec: Optional[str]

class MediaMetadata(BaseModel):
    id: str
    title: str
    thumbnail: Optional[str]
    description: Optional[str]
    uploader: Optional[str]
    duration: Optional[int]
    platform: str
    formats: List[MediaFormat]

class ApiKey(BaseModel):
    key: str
    user_email: str
    name: str = "Default Key"
    usage_limit: int = 100
    current_usage: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MediaLog(BaseModel):
    url: str
    user_email: Optional[str] = None
    platform: str
    title: str
    thumbnail: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
