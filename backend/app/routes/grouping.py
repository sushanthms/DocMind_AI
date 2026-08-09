from fastapi import APIRouter

from app.models.documents import documents
from app.services.grouping import group_documents

router = APIRouter()

@router.get("/groups")
def get_groups():

    groups = group_documents(documents)

    return groups