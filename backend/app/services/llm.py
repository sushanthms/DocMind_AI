from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="llama3.2",
    temperature=0
)

def generate_answer(prompt):

    response = llm.invoke(prompt)

    return response.content