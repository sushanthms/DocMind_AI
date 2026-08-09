from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, documents # from app/routes import upload.py
from app.routes import search
from app.routes import chat
from app.routes import recommend
from app.routes import duplicates
from app.routes import grouping

app = FastAPI(title="DocMind AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
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