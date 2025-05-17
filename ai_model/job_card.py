import json
import pandas
from vector import retriever

# Загрузка резюме из resume.json
with open('resume.json', encoding='utf-8') as f:
    resumes_data = json.load(f)

# Получаем список резюме
resumes = resumes_data.get('resumes', [])

def find_jobs_for_resume(resume):
    """
    Поиск подходящих вакансий для одного резюме через retriever.
    Возвращает список релевантных документов.
    """
    # Формируем строку для поиска по ключевым полям резюме
    query = f"{resume.get('title', '')} {', '.join(resume.get('skills', []))} {resume.get('experience', '')} {resume.get('location', '')}"
    docs = retriever.get_relevant_documents(query)
    return docs

# Пример использования: найти вакансии для всех резюме
if __name__ == "__main__":
    for resume in resumes:
        print(f"\nРезюме: {resume['title']} ({resume['location']})")
        docs = find_jobs_for_resume(resume)
        for doc in docs:
            print(f"- {doc.page_content[:100]}...")

