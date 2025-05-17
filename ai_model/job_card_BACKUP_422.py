import json
<<<<<<< HEAD
=======
import pandas
>>>>>>> 05527e21fbeaefb99065d1bd54cb96f8840b8d78
from vector import retriever

# Загрузка резюме из resume.json
with open('resume.json', encoding='utf-8') as f:
    resumes_data = json.load(f)

<<<<<<< HEAD
resumes = resumes_data.get('resumes', [])

def score_vacancy(resume, doc):
    """
    Оценка релевантности вакансии для резюме (0-10).
    Чем больше совпадений по ключевым полям, тем выше балл.
    """
    score = 0
    # Совпадение по названию
    if resume.get('title', '').lower() in doc.page_content.lower():
        score += 3
    # Совпадения по навыкам
    skills = resume.get('skills', [])
    for skill in skills:
        if skill.lower() in doc.page_content.lower():
            score += 1
    # Совпадение по опыту
    if resume.get('experience', '').split()[0] in doc.page_content:
        score += 2
    # Совпадение по локации
    if resume.get('location', '').lower() in doc.page_content.lower():
        score += 2
    return min(score, 10)

def find_top_vacancies_for_resume(resume, top_k=10):
    query = f"{resume.get('title', '')} {', '.join(resume.get('skills', []))} {resume.get('experience', '')} {resume.get('location', '')}"
    docs = retriever.get_relevant_documents(query)
    # Оценить каждую вакансию
    scored = [(doc, score_vacancy(resume, doc)) for doc in docs]
    # Отсортировать по убыванию оценки
    scored.sort(key=lambda x: x[1], reverse=True)
    return scored[:top_k]

if __name__ == "__main__":
    for resume in resumes:
        print(f"\nРезюме: {resume['title']} ({resume['location']})")
        top_vacancies = find_top_vacancies_for_resume(resume)
        for i, (doc, score) in enumerate(top_vacancies, 1):
            print(f"{i}. Оценка: {score}/10 | {doc.page_content[:120]}...")
=======
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
>>>>>>> 05527e21fbeaefb99065d1bd54cb96f8840b8d78

