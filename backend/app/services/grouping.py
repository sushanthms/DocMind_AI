from sklearn.cluster import KMeans
import numpy as np

def group_documents(documents, n_clusters=3):

    if len(documents) == 0:
        return {}

    if len(documents) < n_clusters:
        n_clusters = len(documents)

    embeddings = []

    for doc in documents:
        embeddings.append(doc["document_embedding"]) # every document has various fields,index, filename, metadata, embeddings.

    embeddings = np.array(embeddings)

    kmeans = KMeans(
        n_clusters=n_clusters,
        random_state=42,
        n_init=10
    )

    labels = kmeans.fit_predict(embeddings) # This will give labels = [0, 1, 1, 2, 0]

    clusters = {}

    for label, doc in zip(labels, documents):

        cluster_name = f"Cluster {label}"

        if cluster_name not in clusters:
            clusters[cluster_name] = []

        clusters[cluster_name].append(doc["filename"])

    return clusters