from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.image_gen import generate_image
from app.dependency import get_current_user,get_db

from . import models, schemas, auth
from .llm import generate_response
from pydantic import BaseModel

router = APIRouter()




@router.post("/register")
def register(user: schemas.RegisterSchema, db: Session = Depends(get_db)):
    exists = db.query(models.User).filter(models.User.username == user.username).first()
    if exists:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = models.User(
        username=user.username,
        email=user.email,
        password=auth.hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: schemas.LoginSchema, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()

    if not db_user or not auth.verify_password(user.password, str(db_user.password)):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = auth.create_access_token(
    data={"sub": str(db_user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": db_user.username,
        "user_id": db_user.id
    }



@router.post("/history")
def save_history(data: schemas.HistoryCreate, db: Session = Depends(get_db)):
    history = models.History(
        user_id=data.user_id,
        prompt=data.prompt,
    )
    db.add(history)
    db.commit()
    return {"message": "History saved"}


@router.get("/history/{user_id}")
def get_history(user_id: int, db: Session = Depends(get_db)):
    history = (
        db.query(models.History)
        .filter(models.History.user_id == user_id)
        .order_by(models.History.created_at.desc())
        .all()
    )
    return history


@router.post("/chat")
def chat(
    data: schemas.ChatRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    response = generate_response(data.prompt)

    db.add(models.History(
        user_id=current_user.id,
        prompt=data.prompt,
        result=response
    ))
    db.commit()

    return {"response": response}



@router.delete("/history/{history_id}")
def delete_history(history_id: int, db: Session = Depends(get_db)):
    history = db.query(models.History).filter(models.History.id == history_id).first()

    if not history:
        raise HTTPException(status_code=404, detail="History not found")

    db.delete(history)
    db.commit()

    return {"message": "History deleted successfully"}


@router.post("/generate-image")
def generate_image_api(
    data: schemas.ImageRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if current_user.image_credits <= 0:
        raise HTTPException(
            status_code=403,
            detail="No image credits left"
        )

    image_url = generate_image(data.prompt)

    current_user.image_credits -= 1
    db.commit()

    record = models.ImageHistory(
        user_id=current_user.id,
        prompt=data.prompt,
        image_url=image_url,
    )
    db.add(record)
    db.commit()

    return {
        "image_url": image_url,
        "remaining_credits": current_user.image_credits,
    }



@router.get("/me")
def get_me(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.image_credits is None:
        current_user.image_credits = 5
        db.commit()

    return {
        "username": current_user.username,
        "image_credits": current_user.image_credits,
    }
