import os

if __name__ == "__main__":
    if (platform.system() == 'Linux'):
        os.system("uvicorn app:app --reload")
    else:
        os.system("python3 -m uvicorn app:app --reload")
