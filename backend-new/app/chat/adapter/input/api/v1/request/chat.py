from typing import List, Optional
from pydantic import BaseModel, Field


class Message(BaseModel):
    role: str = Field(..., description="The role of the message author (system, user, assistant)")
    content: str = Field(..., description="The content of the message")


class ChatCompletionRequest(BaseModel):
    model: Optional[str] = Field(None, description="Model to use for completion (defaults to environment setting)")
    messages: List[Message] = Field(..., description="A list of messages for the conversation")
    stream: Optional[bool] = Field(False, description="Whether to stream the response")
