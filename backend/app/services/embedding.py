import os
import numpy as np
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key=os.getenv("HF_TOKEN")
)

def create_embeddings(chunks):

    embeddings = []

    for chunk in chunks:

        embedding = client.feature_extraction(
            chunk,
            model="sentence-transformers/all-MiniLM-L6-v2"
        )

        embeddings.append(np.array(embedding).flatten())

    return np.array(embeddings)

def create_document_embedding(text):

    embedding = client.feature_extraction(
        text,
        model="sentence-transformers/all-MiniLM-L6-v2"
    )

    return np.array(embedding).flatten()