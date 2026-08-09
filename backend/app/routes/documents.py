# this file is used to get files. it is an API endpoint
from fastapi import APIRouter

from app.models.documents import documents

router = APIRouter()

@router.get("/documents")
def get_documents():

    return documents