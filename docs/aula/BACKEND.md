# Criando a pasta do backend

1. Navegar para ela com `cd backend`
2. No arquivo do `requirements.txt`:

```bash
fastapi
uvicorn
requests
openai
python-dotenv
```

3. Criar `main.py`:

```python
# Importando as bibliotecas
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
```

```python
# Carregando o arquivo dotenv (.env) e a API
load_dotenv()
app = FastAPI()
```

```python
# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # permitindo todos, mas pode ser específico para localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

```python
# Suporte para múltiplas APIs - Tokens precisam ser criados na conta de desenvolvedor
# Acesse a página de desenvolvedor do OpenAI, Anthropic e Google AI para gerar o seu Token
OPENAI_TOKEN = os.getenv("OPENAI_TOKEN")
ANTHROPIC_TOKEN = os.getenv("ANTHROPIC_TOKEN")
GEMINI_TOKEN = os.getenv("GEMINI_TOKEN")
API_CHOICE = os.getenv("API_CHOICE", "anthropic")  # "openai", "anthropic" ou "gemini"
```

```python
# Validação do token
if API_CHOICE == "anthropic" and ANTHROPIC_TOKEN:
    print(f"✅ Usando API Anthropic (Claude)")
    print(f"   Token: {ANTHROPIC_TOKEN[:20]}...")
elif API_CHOICE == "openai" and OPENAI_TOKEN:
    print(f"✅ Usando API OpenAI")
    print(f"   Token: {OPENAI_TOKEN[:20]}...")
elif API_CHOICE == "gemini" and GEMINI_TOKEN:
    print(f"✅ Usando API Gemini")
    print(f"   Token: {GEMINI_TOKEN[:20]}...")
else:
    print("⚠️ AVISO: Nenhuma API configurada corretamente!")

class PreferencesRequest(BaseModel):
    preferences: str

```

```python
# Get Inicial
@app.get("/")
def read_root():
    token_loaded = False
    if API_CHOICE == "anthropic":
        token_loaded = bool(ANTHROPIC_TOKEN)
    elif API_CHOICE == "openai":
        token_loaded = bool(OPENAI_TOKEN)
    elif API_CHOICE == "gemini":
        token_loaded = bool(GEMINI_TOKEN)
    
    return {
        "message": "API funcionando!",
        "api_em_uso": API_CHOICE,
        "token_loaded": token_loaded,
        "endpoints": ["/", "/recommend (GET)", "/recommend (POST)"]
    }

# Get Recommend
@app.get("/recommend")
def read_recommend():
    return {
        "message": "Use POST para enviar preferências.",
        "exemplo": {"preferences": "filmes de ação e aventura"}
    }

```

```python
# Get Recommend com Claude (Anthropic)
def read_recommend_anthropic(preferences: str):
    """Usa API do Claude (Anthropic)"""
    if not ANTHROPIC_TOKEN:
        raise HTTPException(status_code=500, detail="Token Anthropic não configurado")
    
    payload = {
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 1024,
        "messages": [
            {
                "role": "user",
                "content": f"Você é um assistente de recomendação. Baseado nas preferências '{preferences}', sugira 5 recomendações detalhadas e criativas. Seja específico e explique brevemente cada recomendação."
            }
        ]
    }
    
    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": ANTHROPIC_TOKEN,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        },
        json=payload,
        timeout=30
    )
    
    if response.status_code != 200:
        error_detail = response.json()
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Erro da Anthropic: {error_detail}"
        )
    
    result = response.json()
    return result["content"][0]["text"]

```

```python
# Get Recommend com OpenAI
def read_recommend_openai(preferences: str):
    """Usa API do OpenAI"""
    if not OPENAI_TOKEN:
        raise HTTPException(status_code=500, detail="Token OpenAI não configurado")
    
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "Você é um assistente de recomendação. Sugira 5 recomendações relevantes e criativas."
            },
            {
                "role": "user",
                "content": f"Baseado nas preferências '{preferences}', sugira recomendações detalhadas."
            }
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }
    
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENAI_TOKEN}",
            "Content-Type": "application/json"
        },
        json=payload,
        timeout=30
    )
    
    if response.status_code != 200:
        error_detail = response.json()
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Erro da OpenAI: {error_detail}"
        )
    
    result = response.json()
    return result["choices"][0]["message"]["content"]
```

```python
# Get Recommend com Gemini (Google)
def read_recommend_gemini(preferences: str):
    """Usa API do Gemini (Google)"""
    if not GEMINI_TOKEN:
        raise HTTPException(status_code=500, detail="Token Gemini não configurado")
    
    # A API do Gemini usa o token na URL
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={GEMINI_TOKEN}"
    
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"Você é um assistente de recomendação. Baseado nas preferências '{preferences}', sugira 5 recomendações detalhadas e criativas. Seja específico e explique brevemente cada recomendação."
                    }
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1024,
        }
    }
    
    response = requests.post(
        url,
        headers={
            "Content-Type": "application/json"
        },
        json=payload,
        timeout=30
    )
    
    if response.status_code != 200:
        error_detail = response.json()
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Erro do Gemini: {error_detail}"
        )
    
    result = response.json()
    
    # A resposta do Gemini tem uma estrutura diferente
    try:
        return result["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError) as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao processar resposta do Gemini: {str(e)}"
        )
```

```python
# Post Recommend
@app.post("/recommend")
def write_recommend(data: PreferencesRequest):
    print(f"\n📥 Recebido: {data.preferences}")
    print(f"🤖 Usando API: {API_CHOICE}")
    
    try:
        if API_CHOICE == "anthropic":
            recommendations = read_recommend_anthropic(data.preferences)
        elif API_CHOICE == "openai":
            recommendations = read_recommend_openai(data.preferences)
        elif API_CHOICE == "gemini":
            recommendations = read_recommend_gemini(data.preferences)
        else:
            raise HTTPException(
                status_code=400,
                detail=f"API '{API_CHOICE}' não suportada. Use: anthropic, openai ou gemini"
            )
        
        print(f"✅ Recomendações geradas com sucesso!")
        
        return {
            "recommendations": recommendations,
            "api_used": API_CHOICE
        }
    
    except requests.exceptions.Timeout:
        print("⏱️ Timeout na requisição")
        raise HTTPException(status_code=504, detail="Timeout ao conectar com a API")
    
    except requests.exceptions.RequestException as e:
        print(f"🔌 Erro de conexão: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro de conexão: {str(e)}")
    
    except HTTPException:
        raise
    
    except Exception as e:
        print(f"❌ Erro inesperado: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

```

4. Criar `setup.sh`

```.sh
#!/bin/bash 
# Script de setup para o backend do Assistente de Recomendação

echo "🔧 Criando ambiente virtual..."
python3 -m venv venv

echo "✅ Ativando ambiente virtual..."
source venv/bin/activate

echo "📦 Instalando dependências..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🚀 Pronto! Para agora vamos rodar a API com:"
echo "source venv/bin/activate && uvicorn main:app --reload"
source venv/bin/activate && uvicorn main:app
```

5. Rodar os comandos no terminal

```bash
chmod +x setup.sh 
./setup.sh
```
