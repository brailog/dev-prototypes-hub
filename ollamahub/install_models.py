import subprocess
import sys
import shutil

class ModelInstaller:
    """
    A manager class to handle the batch installation of Ollama models
    referenced in the 2026 Local LLM Comparison tables.
    """

    TARGET_MODELS: list[str] = [
        "gemma3:latest",       # Google's efficient 2026 release
        "llama4:8b",           # (Or llama3.3) The new efficient standard
        "deepseek-r1:7b",      # Top reasoning model of the year
        "qwen3:14b",           # Best multilingual/coding model
        "phi4:latest",         # Microsoft's updated small language model
        "gpt-oss:20b",         # OpenAI's open-weight entry (if available)
        "mistral-large:latest" # The consistent workhorse
    ]

    def __init__(self) -> None:
        """
        Initialize the installer and verify Ollama is installed.
        """
        self._check_ollama_installed()

    def _check_ollama_installed(self) -> None:
        """
        Verify that the 'ollama' CLI tool is accessible in the system path.
        
        Raises:
            EnvironmentError: If ollama is not found.
        """
        if not shutil.which("ollama"):
            raise EnvironmentError(
                "Ollama is not installed or not in your PATH. "
                "Please install it from https://ollama.com/"
            )

    def pull_model(self, model_name: str) -> bool:
        """
        Pull a specific model from the Ollama library.

        Args:
            model_name (str): The tag of the model to pull (e.g., 'llama4:8b').

        Returns:
            bool: True if the pull was successful, False otherwise.
        """
        print(f"Starting download for: {model_name}...")
        try:
            # We use stream=True (conceptually) by allowing stdout to flow to the console
            subprocess.run(
                ["ollama", "pull", model_name],
                check=True,
                stdout=sys.stdout,
                stderr=sys.stderr
            )
            print(f"Successfully installed {model_name}\n")
            return True
        except subprocess.CalledProcessError:
            print(f"Failed to install {model_name}. It may not exist or connection failed.\n")
            return False

    def install_all(self) -> None:
        """
        Iterate through the target list and install all models.
        """
        print("Starting Batch Installation for 2026 Models Lists...")
        print("-----------------------------------------------------")
        
        success_count = 0
        for model in self.TARGET_MODELS:
            if self.pull_model(model):
                success_count += 1
        
        print("-----------------------------------------------------")
        print(f"Batch complete. Installed {success_count}/{len(self.TARGET_MODELS)} models.")

if __name__ == "__main__":
    try:
        installer = ModelInstaller()
        installer.install_all()
    except EnvironmentError as e:
        print(f"Error: {e}")
