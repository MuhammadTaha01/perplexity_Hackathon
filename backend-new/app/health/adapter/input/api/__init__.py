from fastapi import APIRouter

from app.health.adapter.input.api.health import health_router

# No prefix for direct access at /health
health_check_router = APIRouter()
health_check_router.include_router(health_router)
