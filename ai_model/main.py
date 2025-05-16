from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from vector import retriever

model = OllamaLLM(model="qwen3:14b", temperature=0.1, max_tokens=2000)

template = '''
You're API to help you find jobs, jobs on the site. Your task is to answer a job seeker's question,\n
 give him role-relevant answers from chroma and attach links to suitable vacancies

Here are some relevant reviews: {job_reviews}

Here is the question to answer: {question}

'''

prompt = ChatPromptTemplate.from_template(template)

chain = prompt | model

def generate_answer(question: str) -> str:
    job_reviews = retriever.invoke(question)
    result = chain.invoke({'job_reviews': job_reviews, 'question': question})
    return result

# Для ручного теста из консоли
if __name__ == "__main__":
    while True:
        print("\n\n--------------------------------------------------------------")
        question = input("Enter job descriptions (comma-separated, q to quit): ")
        print("\n\n--------------------------------------------------------------")
        if question.lower() == 'q':
            break
        answer = generate_answer(question)
        print(answer)