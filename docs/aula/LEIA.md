# Passo a passo do Projeto de Recomendação para criar no vídeo

1. Criar pasta, GitHub e .gitignore
2. No terminal, digitar

```bash
git init
git remote add origin https://github.com/Apprendendo/assistente-recomendacao/
git pull
```

3. Em .gitignore, tipar:

```.gitignore
.venv/
venv/
node_modules/
__pycache__/
.env
.expo/
```

4. Criar o .env

```bash
ANTHROPIC_TOKEN=
OPENAI_TOKEN=
GEMINI_TOKEN=
API_CHOICE=
```

5. Criar a estrutura com `mkdir backend`

[BACKEND](BACKEND.md)
[FRONTEND](FRONTEND.md)
