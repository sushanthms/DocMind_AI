import numpy as np
import onnxruntime as ort

from huggingface_hub import hf_hub_download
from transformers import AutoTokenizer # AutoTokenizer is not the tokenizer, it is a class that can automatically load the correct tokenizer for a model.


MODEL_REPO = "sentence-transformers/all-MiniLM-L6-v2"


tokenizer = AutoTokenizer.from_pretrained(
    MODEL_REPO
)


model_path = hf_hub_download(
    repo_id=MODEL_REPO,
    filename="onnx/model.onnx"
)


session = ort.InferenceSession(
    model_path,
    providers=["CPUExecutionProvider"]
)


def mean_pooling(token_embeddings, attention_mask):

    mask = np.expand_dims(
        attention_mask,
        axis=-1
    )

    mask = np.broadcast_to(
        mask,
        token_embeddings.shape
    )

    summed = np.sum(
        token_embeddings * mask,
        axis=1
    )

    count = np.clip(
        mask.sum(axis=1),
        1e-9,
        None
    )

    return summed / count


def encode(text):

    encoded = tokenizer(
        text,
        padding=True,
        truncation=True,
        max_length=256,
        return_tensors="np"
    )

    inputs = {
        "input_ids": encoded["input_ids"],
        "attention_mask": encoded["attention_mask"]
    }

    if "token_type_ids" in encoded:
        inputs["token_type_ids"] = encoded["token_type_ids"]

    outputs = session.run(
        None,
        inputs
    )

    token_embeddings = outputs[0]

    embedding = mean_pooling(
        token_embeddings,
        encoded["attention_mask"]
    )

    embedding = embedding / np.linalg.norm(
        embedding,
        axis=1,
        keepdims=True
    )

    return embedding[0] # encode() takes one text at a time, it gives output as [[]] so we write [0] to get first row


def create_embeddings(chunks):

    embeddings = []

    for chunk in chunks:

        embedding = encode(chunk)

        embeddings.append(embedding)

    return np.array(embeddings)


def create_document_embedding(text):

    return encode(text)