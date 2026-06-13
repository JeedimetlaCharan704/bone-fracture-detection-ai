# BoneFracture AI 🦴

AI-powered bone fracture detection web application. Upload X-ray images and receive instant fracture detection results with confidence scores.

## Architecture

```
bone-fracture-detection/
├── frontend/          # Next.js 15 (App Router) + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/           # Routes, layouts, pages
│   │   ├── components/    # Shared & feature components
│   │   ├── features/      # Feature modules
│   │   ├── lib/           # Utilities (db, cloudinary, models)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── actions/       # Server actions
│   │   ├── types/         # TypeScript types
│   │   └── validators/    # Zod schemas
│   ├── vercel.json
│   └── package.json
├── backend/           # Python FastAPI AI Service
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # AI service abstraction
│   │   └── schemas/       # Pydantic models
│   ├── Dockerfile
│   └── requirements.txt
└── README.md
```

## Tech Stack

**Frontend:**
- Next.js 15 (App Router) with Turbopack
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Framer Motion
- Auth.js v5 (NextAuth) — Google OAuth + Credentials
- MongoDB + Mongoose
- Cloudinary
- Recharts
- React-PDF
- React Hook Form + Zod

**Backend (AI Service):**
- Python FastAPI
- Pillow (image processing)
- NumPy
- Swappable model architecture (Mock → YOLOv11 → PyTorch)

## Prerequisites

- Node.js 18+
- Python 3.12+
- MongoDB Atlas account
- Google OAuth credentials
- Cloudinary account

## Environment Variables

### Frontend (`frontend/.env.local`)

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bone-fracture

# Auth.js (NextAuth v5)
AUTH_SECRET=your-auth-secret-at-least-32-chars-long
AUTH_URL=http://localhost:3000

# Google OAuth
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=bone-fracture-uploads

# FastAPI AI Service
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (`backend/.env`)

```env
MODEL_TYPE=mock
MODEL_PATH=
HOST=0.0.0.0
PORT=8000
DEBUG=false
MAX_IMAGE_SIZE_MB=10
```

## Quick Start

### 1. Frontend

```bash
cd frontend
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```

### 2. Backend (AI Service)

```bash
cd backend
cp .env.example .env
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Open

Frontend: http://localhost:3000
Backend API docs: http://localhost:8000/docs

## Features

- **Authentication**: Google OAuth + email/password registration
- **X-Ray Upload**: Drag & drop with preview (JPG, JPEG, PNG, max 10MB)
- **AI Detection**: Real-time fracture analysis with confidence scores
- **Scan History**: Search, filter, sort, paginate through all scans
- **PDF Reports**: Downloadable AI analysis reports
- **User Profile**: Avatar upload, name editing, password management
- **Dark/Light Mode**: System-aware theme switching
- **Responsive Design**: Works on desktop, tablet, and mobile

## AI Model Integration

The AI service uses a modular predictor architecture:

1. **MockPredictor** — Returns realistic random results (for development)
2. **YOLOv11Predictor** — Ready for YOLOv11 integration (see `backend/app/services/predictor.py`)
3. **PyTorchPredictor** — Ready for custom PyTorch models

To switch models, set `MODEL_TYPE` in the backend `.env`:
- `mock` — Development/testing
- `yolov11` — YOLOv11 model (requires `ultralytics`)
- `pytorch` — Custom PyTorch model (requires `torch`)

## Deployment

### Frontend → Vercel

```bash
cd frontend
npx vercel --prod
```

Set all environment variables in the Vercel dashboard.

### Backend → Railway

```bash
cd backend
# Push to GitHub, connect to Railway
# Railway will auto-detect the Dockerfile
```

Set `MODEL_TYPE=mock` (or your model type) in Railway environment variables.

## API Endpoints

### Frontend (Next.js API Routes)

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | Authentication |
| `/api/scans` | GET, POST | List/Create scans |
| `/api/scans/[id]` | GET | Get single scan |
| `/api/reports` | GET, POST | List/Create reports |
| `/api/upload` | POST | Upload image to Cloudinary |
| `/api/upload/avatar` | POST | Upload avatar to Cloudinary |

### Backend (FastAPI AI Service)

| Route | Method | Description |
|-------|--------|-------------|
| `/predict` | POST | Analyze X-ray image |
| `/health` | GET | Health check |

## License

MIT
