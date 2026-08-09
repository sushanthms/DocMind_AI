from sklearn.cluster import KMeans
import numpy as np

from app.services.cluster_naming import generate_cluster_name

def group_documents(documents, n_clusters=3):

    if len(documents) == 0:
        return {}

    if len(documents) < n_clusters:
        n_clusters = len(documents)# makes the n_cluster equal to number of documents when number of documents is less than n_clusters

    embeddings = []

    for doc in documents:
        embeddings.append(doc["document_embedding"])
        # embeddings are obtained from each documents while iteration. each document has filename, document_embedding.
    embeddings = np.array(embeddings)# embedding are converted to numpy array format

    kmeans = KMeans(
        n_clusters=n_clusters,
        random_state=42,
        n_init=10 # KMeans runs 10 times
    )

    labels = kmeans.fit_predict(embeddings)

    clusters = {}

    for label, doc in zip(labels, documents): # Combines two lists element by element.

        cluster_name = f"Cluster {label}"

        if cluster_name not in clusters:
            clusters[cluster_name] = [] # if a group anme liek CLuster 0 not exists it is created

        clusters[cluster_name].append(doc["filename"]) # {"Cluster1":["resume.pdf"]} if next file is cluster 1 then it is added inside cluster 1.
        named_groups = {}

    for cluster, files in clusters.items():

        name = generate_cluster_name(
            files
        )

        named_groups[name] = files

    return named_groups
