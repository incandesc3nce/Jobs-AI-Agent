import pandas as pd
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from vector import retriever


model = OllamaLLM(model="qwen3:14b", max_tokens=2000)

template = '''
You're an artificial intelligence model that helps clients find role-relevant jobs based on their resumes.

Here are some relevant job reviews: {job_reviews}

Here is the question to answer: {resume}

'''

prompt = ChatPromptTemplate.from_template(template)

chain = prompt | model



def generate_answer_resume(resume: str) -> str:
    job_reviews = retriever.invoke(resume)
    result = chain.invoke({'job_reviews': job_reviews,'resume': resume})
    return result

# Для ручного теста из консоли
if __name__ == "__resume__":
    while True:
        print("\n\n--------------------------------------------------------------")
        question = input("Enter job descriptions (comma-separated, q to quit): ")
        print("\n\n--------------------------------------------------------------")
        if question.lower() == 'q':
            break
        answer = generate_answer_resume(question)
        print(answer)