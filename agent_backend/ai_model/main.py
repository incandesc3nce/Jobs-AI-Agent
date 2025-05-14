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


while True:
    print("\n\n--------------------------------------------------------------")
    # Get user input for job descriptions and job seekers
    question = input("Enter job descriptions (comma-separated, q to quit): ")
    print("\n\n--------------------------------------------------------------")
    if question.lower() == 'q':
        break
    
    job_reviews = retriever.invoke(question)

    result = chain.invoke({'job_reviews': job_reviews, 'question': question})
    print(result)