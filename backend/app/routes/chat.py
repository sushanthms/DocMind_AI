from fastapi import APIRouter

from app.services.embedding import create_document_embedding
from app.services.vector_db import search_documents
from app.services.llm import generate_answer

router = APIRouter()

@router.get("/chat")
def chat(question: str):

    question_embedding = create_document_embedding(question)

    results = search_documents(
        question_embedding,
        n_results=10 # Chroma finds the 10 chunks that are most similar to this question.
    )

    chunks = results["documents"][0] # documents stores chunks in [[here chunks are stored]], so we wrote 0 means first position
    print("Retrieved chunks:")
    for i, chunk in enumerate(chunks):
      print("CHUNK", i)
      print(chunk)
      print("----------------")

    context = "\n\n".join(chunks)

    prompt = f"""
You are a document assistant.

Answer ONLY using the provided context.

If the answer exists in the context, provide it.

Do not say you don't know unless the information is completely missing.

Context:
{context}

Question:
{question}

Answer:
"""
    answer = generate_answer(prompt)

    sources = []

    for metadata in results["metadatas"][0]:

     filename = metadata["filename"]

     if filename not in sources:
        sources.append(filename)

    return {
        "question": question,
        "answer": answer,
        "sources": sources
    }