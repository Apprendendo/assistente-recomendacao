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