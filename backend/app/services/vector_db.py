import chromadb

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection( # name for the collection is documents, get if existed otherwise creates the collection
    name="documents"
)

def store_embeddings(filename, chunks, embeddings): # Python replaces this parameters in upload.py

    ids = []

    metadatas = []

    for index, chunk in enumerate(chunks): # enumerate gives index value for chunks

        ids.append(f"{filename}_{index}")

        metadatas.append(
            {
                "filename": filename
            }
        )

    collection.add(

        ids=ids,

        documents=chunks,

        embeddings=embeddings.tolist(),

        metadatas=metadatas

    )

def search_documents(
    query_embedding,
    n_results=5
):
# results = collection.query(query_embeddings=[query_embedding.tolist()], n_results=n_results)
    results = collection.query(

        query_embeddings=[
            query_embedding.tolist()# list of vectors
        ],

        n_results=n_results

    )

    return results