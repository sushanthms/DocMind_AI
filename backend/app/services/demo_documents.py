from pathlib import Path

from app.services.pdf_processor import extract_text_from_pdf
from app.services.chunking import create_chunks
from app.services.embedding import create_embeddings, create_document_embedding
from app.services.vector_db import store_embeddings
from app.models.documents import documents

DEMO_DIR = Path("sample_documents")

def load_demo_documents():

    demo_files = list(DEMO_DIR.glob("*.pdf"))

    for file_path in demo_files:

        print(f"Loading demo document: {file_path.name}")

        text = extract_text_from_pdf(file_path)

        chunks = create_chunks(text)

        embeddings = create_embeddings(chunks)

        document_embedding = create_document_embedding(text)

        store_embeddings(
            file_path.name,
            chunks,
            embeddings
        )

        documents.append(
            {
                "filename": file_path.name,
                "path": str(file_path),
                "text": text,
                "chunks": chunks,
                "embeddings": embeddings.tolist(),
                "document_embedding": document_embedding.tolist()
            }
        )

        print(f"Loaded demo document: {file_path.name}")