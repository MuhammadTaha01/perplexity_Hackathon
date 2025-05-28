import os

# Set environment variables if they're not already set
env = os.environ.get("ENV", "local")
debug = os.environ.get("DEBUG", "True")

if "ENV" not in os.environ:
    os.environ["ENV"] = env
if "DEBUG" not in os.environ:
    os.environ["DEBUG"] = debug

# Import the app from app.server
from app.server import app

# This file enables running directly with:
# uvicorn asgi:app --host 0.0.0.0 --port 8080
