import os
import httpx
from typing import Dict, List, Optional, Any
import dotenv
from core.config import config

# Load environment variables from .env file
dotenv.load_dotenv()


class PerplexityService:
    def __init__(self):
        self.api_key = os.getenv("PERPLEXITY_API_KEY")
        
        if not self.api_key and hasattr(config, "PERPLEXITY_API_KEY"):
            self.api_key = config.PERPLEXITY_API_KEY
            
        self.base_url = os.getenv("PERPLEXITY_API_BASE_URL", "https://api.perplexity.ai")
        self.default_model = os.getenv("PERPLEXITY_MODEL", "llama-3-sonar-small-32k-online")
        self.default_max_tokens = int(os.getenv("PERPLEXITY_MAX_TOKENS", "4096"))
        self.default_temperature = float(os.getenv("PERPLEXITY_TEMPERATURE", "0.7"))

    async def create_chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        stream: bool = False,
    ) -> Dict[str, Any]:
        """
        Create a chat completion with Perplexity API
        """
        if not self.api_key:
            raise ValueError("Perplexity API key is not set")

        url = f"{self.base_url}/chat/completions"
        
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        data = {
            "model": model or self.default_model,
            "messages": messages,
        }
        
        if max_tokens is not None:
            data["max_tokens"] = max_tokens
        elif self.default_max_tokens:
            data["max_tokens"] = self.default_max_tokens
            
        if temperature is not None:
            data["temperature"] = temperature
        elif self.default_temperature:
            data["temperature"] = self.default_temperature
            
        if stream:
            data["stream"] = stream
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data, timeout=60.0)
            
            if response.status_code != 200:
                try:
                    error_data = response.json()
                    error_message = error_data.get("error", {}).get("message", "Unknown error")
                except:
                    error_message = f"HTTP error {response.status_code}"
                raise Exception(f"Perplexity API error: {error_message}")
            
            return response.json()
