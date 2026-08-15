import numpy as np

def cosine_similarity(vec1, vec2):

    vec1 = np.array(vec1) # Converts list into numpy arrays
    vec2 = np.array(vec2)
 # cosine formula
    return np.dot(vec1, vec2) / ( np.linalg.norm(vec1) * np.linalg.norm(vec2))# norm calculates vector length, length of vector1 × length of vector2

def find_duplicates( # this function gets target_document and documents from this code in duplicates.py file, duplicates = find_duplicates(target, documents) 
    target_document,
    documents,
    threshold=0.90
):

    duplicates = []

    for doc in documents:

        if doc["filename"] == target_document["filename"]: # means we skip the document with same filename
            continue

        score = cosine_similarity(
            target_document["document_embedding"],
            doc["document_embedding"]
        )

        if score >= threshold:

            duplicates.append(
                {
                    "filename": doc["filename"],
                    "similarity": float(score)
                }
            )
    # dulicates is a list in duplicates.py file
    duplicates.sort(
        key=lambda x: x["similarity"],
        reverse=True
    )

    return duplicates