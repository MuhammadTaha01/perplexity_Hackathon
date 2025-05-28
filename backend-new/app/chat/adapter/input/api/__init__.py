from fastapi import APIRouter

from app.chat.adapter.input.api.v1.chat import chat_router as chat_v1_router

chat_router = APIRouter(prefix="/api")
chat_router.include_router(chat_v1_router)
