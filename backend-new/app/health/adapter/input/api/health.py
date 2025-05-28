import time
import os
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel
from typing import Dict, Any, Optional
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.chat.application.service.perplexity import PerplexityService
from core.fastapi.dependencies import PermissionDependency, AllowAll
from core.db.session import session_factory
from core.config import config


# Response model for health check
class HealthCheckResponse(BaseModel):
    status: str
    version: str
    timestamp: str
    uptime: float
    perplexity_api: Dict[str, Any]
    database: Dict[str, Any]


# Start time for uptime calculation
START_TIME = time.time()


health_router = APIRouter(prefix="/health", tags=["Health"])


async def check_database_connection(url: str) -> Dict[str, Any]:
    """Check database connection using the provided URL."""
    status = {
        "connected": False,
        "error": None
    }
    
    try:
        # Create a new engine for this check
        engine = create_async_engine(url)
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
            status["connected"] = True
        await engine.dispose()
    except Exception as e:
        status["error"] = str(e)
    
    return status


@health_router.get(
    "",
    response_model=HealthCheckResponse,
    dependencies=[Depends(PermissionDependency([AllowAll]))],
    status_code=status.HTTP_200_OK,
    responses={
        200: {"description": "Service is healthy"},
        503: {"description": "Service is unhealthy"}
    }
)
async def health_check() -> Response:
    """
    Health check endpoint to verify the application is running correctly.
    Checks both writer and reader database connections and Perplexity API status.
    This endpoint is intended to be called once per hour.
    """
    # Check Perplexity API
    perplexity_service = PerplexityService()
    perplexity_status = {
        "connected": False, 
        "model": None, 
        "error": None
    }
    
    try:
        # Check if Perplexity API key is configured
        if perplexity_service.api_key:
            perplexity_status["connected"] = True
            perplexity_status["model"] = perplexity_service.default_model
        else:
            perplexity_status["error"] = "API key not configured"
    except Exception as e:
        perplexity_status["error"] = str(e)

    # Check database connections using URLs from config
    database_status = {
        "writer": await check_database_connection(config.WRITER_DB_URL),
        "reader": await check_database_connection(config.READER_DB_URL)
    }
    
    # Calculate uptime in seconds
    uptime = time.time() - START_TIME
    
    # Overall status is healthy only if both databases are connected
    is_healthy = database_status["writer"]["connected"] and database_status["reader"]["connected"]
    
    response_data = HealthCheckResponse(
        status="healthy" if is_healthy else "unhealthy",
        version="1.0.0",
        timestamp=datetime.now().isoformat(),
        uptime=uptime,
        perplexity_api=perplexity_status,
        database=database_status
    )

    # Return appropriate status code for Render health check
    if is_healthy:
        return Response(
            content=response_data.model_dump_json(),
            media_type="application/json",
            status_code=status.HTTP_200_OK
        )
    else:
        return Response(
            content=response_data.model_dump_json(),
            media_type="application/json",
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE
        )
