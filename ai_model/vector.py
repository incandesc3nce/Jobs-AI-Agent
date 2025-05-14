from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import pandas as pd

df = pd.read_csv("norm_vac.csv")
embeddings = OllamaEmbeddings(model="qwen3:14b")
# Load the CSV file into a DataFrame
# df = pd.read_csv("norm_vac.csv")


# Create a Chroma vector store

db_location = "./chrome_langchain_db" # Path to the directory where the vector store will be saved
# Check if the directory exists
add_documents = not os.path.exists(db_location)

if add_documents:
    documents = [] # This two list 
    ids = []
    
    for i, row in df.iterrows():
        document = Document(
            page_content=row["name"] + " " + str(row["description"]),
            metadata={
                "published_at": row["published_at"],
                "employer": row["employer.name"],
                "alternate_url": row["alternate_url"],
                "employer_url": row["employer.alternate_url"]
            },
            id=str(i)
        )
        # Add the document to the list
        ids.append(str(i))
        documents.append(document)
        
vector_store = Chroma(
    collection_name="job_reviews",
    persist_directory=db_location,
    embedding_function=embeddings
)

if add_documents:
    vector_store.add_documents(documents=documents, ids=ids)

# Search for similar documents
# Persist the vector store to disk
retriever = vector_store.as_retriever(
    search_kwargs={"k": 10} # Number of documents to retrieve
)