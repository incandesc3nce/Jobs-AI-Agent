from fastapi import FastAPI, Depends, HTTPException, Header, Request, Body
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from main import generate_answer
from vector import retriever

load_dotenv()

app = FastAPI()

def verify_api_key(x_api_key: str = Header(None)):
    # Просто проверка наличия ключа, без кредитов
    if not x_api_key or x_api_key != os.getenv("API_KEY"):
        raise HTTPException(status_code=401, detail="Invalid API Key")
    return x_api_key

@app.post("/generate")
def generate(prompt: str):
    result = generate_answer(prompt + "/no_think")
    return result

@app.get("/ping")
def ping():
    return {"status": "ok"}

class RankVacanciesRequest(BaseModel):
    question: str
    k: int = 10  # Сколько вакансий искать (по умолчанию 10)

'''@app.post("/rank_vacancies")
def rank_vacancies_endpoint(data: RankVacanciesRequest):
    # Получаем k наиболее релевантных вакансий из эмбеддингов chroma
    docs = retriever.invoke(data.question)
    # docs - это список документов, преобразуем их в текст вакансии
    vacancies = [doc.page_content for doc in docs][:data.k]
    result = rank_vacancies(data.question, vacancies)
    return result
'''
@app.post("/resume")
async def resume_endpoint(request: Request, res_prompt: str):
        # Получаем тело запроса как байты и преобразуем в строку
    body_bytes = await request.body()
    body_text = body_bytes.decode("utf-8")

    # Объединяем answer из параметров и тело запроса
    resume = res_prompt + body_text

    # Вызываем вашу функцию обработки
    result = generate_answer(resume + "/no_think")

    return result

