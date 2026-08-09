# Related Document Recommendation using cosine simialrity
from fastapi import APIRouter
from app.models.documents import documents
from app.services.similarity import cosine_similarity

router = APIRouter() # APIRouter helps create groups of APIs. Each file has its own router

@router.get("/recommend/{filename}") # creates a GET HTTP route.
def recommend(filename:str): # filename should be a string.

    target = None # Currently empty

    for doc in documents:
        if doc["filename"] == filename:
            target = doc

    if target is None:
        return {
            "error":"Document not found"
        }

# target["document_embedding"] is the document embedding from the database(documents list), user sends only the filename
# target["document_embedding"] is the embedding of the requested file.
# target["document_embedding"] is the document we choosed from the databse which matched the filename in the url.
# doc["document_embedding"] is the iteration, it is all files one by one we iterate

    results=[]

    for doc in documents:

        if doc["filename"] != filename:

            score = cosine_similarity(
                target["document_embedding"],
                doc["document_embedding"]
            )

            results.append(
                {
                    "filename":doc["filename"],
                    "similarity":score
                }
            )

    results.sort(
        key=lambda x:x["similarity"],
        reverse=True
    )

    return results[:5]
# results contains two things filename and similarity score.
# x means filename and similarity score. so we choose similarity score only by using x["similarity"]
# def get_similarity(x):
#   return x["similarity"]
# lambda is a Python keyword used to create a small function without name