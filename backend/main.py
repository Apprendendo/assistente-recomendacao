# importando bibliotecas para a leitura da API
import os
from fastapi import FastAPI
import requests
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env
load_dotenv()

# Carrega API
app = FastAPI()

# Carrega o token da OpenAI, gerado ao criar a conta de desenvolvedor (importante não compartilhar)
OPENAI_TOKEN = os.getenv("OPENAI_TOKEN")

# Chamando o Get inicial, informando que estamos já com a API a ser lida
@app.get("/")
def read_root(): 
    return {"message": "Olá, API funcionando! Navegue através do /recommend, para saber se funcionou"}

# Get Recommend
@app.get("/recommend") 
def recommend_get(): 
    return {"message": "Use POST para enviar preferências. Exemplo: {\"preferences\": \"filmes de ação\"}"}

# Post recommend
@app.post("/recommend")
async def recommend(preferences: dict):
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {OPENAI_TOKEN}"},
        json={ "model": "gpt-4", "messages": [ {"role": "system", "content": "Você é um assistente de recomendação."}, {"role": "user", "content": f"Baseado em {preferences}, sugira recomendações."} ] }
    )
    return {"recommendations": response.json()["choices"][0]["message"]["content"]}

