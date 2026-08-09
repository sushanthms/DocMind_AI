from fastapi import APIRouter, UploadFile, File # these are class from FastAPI
from typing import List
from pathlib import Path
import shutil
# when python runs models/document.py it creates a list, upload.py uses the same documents list that already exists.  
from app.services.pdf_processor import extract_text_from_pdf
from app.services.chunking import create_chunks
from app.services.embedding import create_embeddings, create_document_embedding
from app.services.vector_db import store_embeddings
from app.models.documents import documents

# UploadFile creates a fiel as UploadFile object.
router = APIRouter()

UPLOAD_DIR = Path("uploads")# path to save the files. before file_path = "uploads/" + file.filename. windows has \ linux has /, here python handles it automatically
UPLOAD_DIR.mkdir(exist_ok=True)# If it exists, ok.

@router.post("/upload")# It is called as decorator. It connects a URL with a function.
async def upload_files(files: list[UploadFile] = File(...)): #File(...)) means required. The user must upload files.

    uploaded_files = []

    for file in files:

        existing_document = next(
            (
                doc
                for doc in documents
                if doc["filename"] == file.filename
            ),
            None
        )

        if existing_document is not None:
            continue

        file_path = UPLOAD_DIR / file.filename

        with open(file_path, "wb") as buffer: # with Automatically closes the file. otherwise we have to write file.close()
            shutil.copyfileobj(
                file.file, # The uploaded file.
                buffer # it represents a temporary place where data is written. buffer is a variable name
            )

            text = extract_text_from_pdf(file_path)
            chunks = create_chunks(text)
            embeddings = create_embeddings(chunks)
            document_embedding = create_document_embedding(text)
            
            store_embeddings(
                    file.filename,
                    chunks,
                    embeddings
            )

            documents.append(
            {
                "filename": file.filename,
                "text": text,
                "chunks": chunks,
                 "embeddings": embeddings.tolist(), # tolosit() converst numpy array into json
                 "document_embedding": document_embedding.tolist()
            }
        )

        file_path.unlink()

        uploaded_files.append(file.filename)

    return {
        "message": "Files uploaded successfully",
        "files": uploaded_files
    }