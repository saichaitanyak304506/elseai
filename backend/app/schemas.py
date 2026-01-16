from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class RegisterSchema(BaseModel):
    username: str
    email: str
    password: str


class LoginSchema(BaseModel):
    username: str
    password: str


class HistoryCreate(BaseModel):
    user_id: int
    prompt: str


class HistoryResponse(BaseModel):
    prompt: str
    created_at: datetime

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    prompt: str
    user_id: Optional[int] = None



class ImageRequest(BaseModel):
    prompt: str
    user_id: Optional[int] = None