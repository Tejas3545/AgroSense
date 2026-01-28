# Plant Care AI – Server (Backend)

Flask API for plant disease analysis using Hugging Face, Gemini, or mock providers.

## Quick Start

```bash
cd server
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # Mac/Linux

pip install -U pip
pip install -r requirements.txt

python app.py
```

The API listens on `http://localhost:5000`.

## Configuration

Edit `.env`:

```dotenv
# Hugging Face Inference API
HUGGINGFACE_API_KEY=your_hf_token
HUGGINGFACE_MODEL=juppy44/plant-identification-2m-vit-b

# Google Gemini
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-2.5-flash

# Provider order (tries in sequence)
PROVIDER_ORDER=hf,gemini,mock

# Flask
FLASK_DEBUG=true
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Endpoints

- **POST /api/analyze** – Analyze a plant image
  ```json
  {
    "image": "data:image/jpeg;base64,..."
  }
  ```
  Returns disease info, confidence, severity, and treatment steps.

- **GET /api/health** – Server status
- **GET /api/diseases** – List all disease types

## Logs

Rotating logs in `logs/app.log` with request/response timing and error details.

## Production

```bash
pip install waitress
waitress-serve --host=0.0.0.0 --port=5000 app:app
```
