from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def create_embeddings(chunks):

    embeddings = model.encode(
        chunks
    )

    return embeddings

def create_document_embedding(text):

    embedding = model.encode(
        text
    )

    return embedding