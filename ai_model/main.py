from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from vector import retriever

model = OllamaLLM(model="qwen3:14b", max_tokens=2000)

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

'''def rank_vacancies(question: str, vacancies: list) -> list:
    """
    Оценивает каждую вакансию по релевантности вопросу с помощью LLM.
    Возвращает список вакансий с оценкой.
    """
    ranked = []
    for vacancy in vacancies:
        prompt_text = f"Вопрос: {question}\nВакансия: {vacancy}\nОцени релевантность вакансии по 10-балльной шкале (0 - не подходит, 10 - идеально):"
        score = model.invoke(prompt_text)
        ranked.append({"vacancy": vacancy, "score": score})
    return ranked
'''
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