import requests
import json

class OllamaManager:
    """
    A manager class to handle interactions with the Ollama API.
    """

    def __init__(self, base_url: str = "http://localhost:11434") -> None:
        """
        Initialize the Ollama manager with the base URL.

        Args:
            base_url (str): The base URL for the Ollama API.
        """
        self.base_url = base_url

    def check_connection(self) -> bool:
        """
        Check if the Ollama service is reachable.

        Returns:
            bool: True if the service is reachable, False otherwise.
        """
        try:
            response = requests.get(self.base_url)
            return response.status_code == 200
        except requests.exceptions.RequestException:
            return False

    def list_models(self) -> list[str]:
        """
        Retrieve a list of available locally installed models.

        Returns:
            list[str]: A list of model names.
        """
        try:
            url = f"{self.base_url}/api/tags"
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            return [model['name'] for model in data.get('models', [])]
        except requests.exceptions.RequestException:
            return []

    def chat(self, model: str, messages: list[dict[str, str]], stream: bool = False) -> str | None:
        """
        Send a chat request to the specified model.

        Args:
            model (str): The name of the model to query.
            messages (list[dict[str, str]]): A list of message dictionaries (role, content).
            stream (bool): Whether to stream the response (currently False for simplicity).

        Returns:
            str | None: The content of the response message, or None if failed.
        """
        url = f"{self.base_url}/api/chat"
        payload = {
            "model": model,
            "messages": messages,
            "stream": stream
        }

        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            
            if stream:
                return "Streaming not implemented in this method version."
            
            result = response.json()
            return result.get("message", {}).get("content", "")
            
        except requests.exceptions.RequestException:
            return None