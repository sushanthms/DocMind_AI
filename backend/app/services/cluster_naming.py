from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="llama3.2"
)

def generate_cluster_name(documents):

    names = "\n".join(
        documents
    )

    prompt = f"""
These documents belong to the same category.

Documents:

{names}

Give a short category name.
Only return the category name.
"""

    response = llm.invoke(prompt)

    return response.content