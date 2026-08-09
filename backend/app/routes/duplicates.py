# similarity and duplicates are some same, but simialirty give stop 5 documents. duplicates has high threshold value(0.9)
from fastapi import APIRouter

from app.models.documents import documents
from app.services.similarity import find_duplicates

router = APIRouter()

@router.get("/duplicates/{filename}")
def check_duplicates(filename: str):

    target = None

    print("Available documents:")

    for doc in documents:
        print(doc["filename"])
        if doc["filename"] == filename:
            target = doc
            break

    if target is None:

        return {
            "error": "Document not found"
        }

    duplicates = find_duplicates(
        target,
        documents
    )

    return {
        "filename": filename,
        "duplicates": duplicates
    }