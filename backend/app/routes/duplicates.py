# similarity and duplicates are same, but simialirty gives top 5 documents. duplicates has high threshold value(0.9)
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
        if doc["filename"] == filename: # this checks if the target document in uploaded document means the document in select document list is same as the documents in the documents list. then fic=x that document as target then we compare the target docuemnt with all documents in the documents list.
            target = doc
            break
# First, we check whether the document selected from the uploaded document list exists in the `documents` list. If the filename matches, we assign that document to `target`. Then, we compare the target document with all the documents in the `documents` list using their embeddings to find similar or duplicate documents.
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