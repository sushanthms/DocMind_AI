from sklearn.cluster import KMeans
import numpy as np

from app.services.cluster_naming import generate_cluster_name

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

         if label not in clusters:
            clusters[label] = []

         clusters[label].append(doc["filename"])

    named_clusters = {}

    for label, files in clusters.items():

        cluster_name = generate_cluster_name(files)

        named_clusters[cluster_name] = files

    return named_clusters