from fastapi import APIRouter, Depends, HTTPException, status
from dependency_injector.wiring import inject

from app.chat.adapter.input.api.v1.request.chat import ChatCompletionRequest
from app.chat.adapter.input.api.v1.response.chat import ChatCompletionResponse
from app.chat.application.service.perplexity import PerplexityService
from core.fastapi.dependencies import PermissionDependency, AllowAll

chat_router = APIRouter(prefix="/v1", tags=["Chat"])


@chat_router.post(
    "/chat/completions",
    response_model=ChatCompletionResponse,
    dependencies=[Depends(PermissionDependency([AllowAll]))],
)
@inject
async def create_chat_completion(
    request: ChatCompletionRequest,
) -> ChatCompletionResponse:
    """
    Create a chat completion with Perplexity API
    """
    try:
        perplexity_service = PerplexityService()
        
        # Convert request to messages format expected by the API
        messages = [
            {"role": message.role, "content": message.content}
            for message in request.messages
        ]
        
        # Call the Perplexity API using only model and messages from request
        # max_tokens and temperature will come from environment settings
        response = await perplexity_service.create_chat_completion(
            messages=messages,
            model=request.model,
            stream=request.stream,
        )
        
        return response
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
