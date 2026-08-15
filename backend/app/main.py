from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, documents # from app/routes import upload.py
from app.routes import search
from app.routes import chat
from app.routes import recommend
from app.routes import duplicates
from app.routes import grouping

from app.services.demo_documents import load_demo_documents

app = FastAPI(title="DocMind AI")

@app.on_event("startup")
def startup_event():
    load_demo_documents()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router( # Takes the routes from upload.py and puts /api before them.
    upload.router,
    prefix="/api"
)

app.include_router(
    documents.router,
    prefix="/api"
)

app.include_router(
    search.router,
    prefix="/api"
)

app.include_router(
    chat.router,
    prefix="/api"
)

app.include_router(
    recommend.router,
    prefix="/api"
)

app.include_router(
    duplicates.router,
    prefix="/api"
)

app.include_router(
    grouping.router,
    prefix="/api"
)

@app.get("/")
def root():
    return {
        "message": "DocMind AI Backend Running 🚀"
    }