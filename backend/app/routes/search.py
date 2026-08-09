from fastapi import APIRouter

from app.services.embedding import create_document_embedding
from app.services.vector_db import search_documents

router = APIRouter()

@router.get("/search")
def semantic_search(query: str):

    query_embedding = create_document_embedding.encode(query)

    results = search_documents(
        query_embedding
    )

    return results