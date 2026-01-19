# 🤖 Assistente de Recomendação - Aula Teste 2026

[![GitHub license](https://img.shields.io/github/license/Apprendendo/assistente-recomendacao?style=for-the-badge)](https://github.com/Apprendendo/assistente-recomendacao)
[![GitHub stars](https://img.shields.io/github/stars/Apprendendo/assistente-recomendacao?style=for-the-badge)](https://github.com/Apprendendo/assistente-recomendacao/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Apprendendo/assistente-recomendacao?style=for-the-badge)](https://github.com/Apprendendo/assistente-recomendacao/network)
[![GitHub issues](https://img.shields.io/github/issues/Apprendendo/assistente-recomendacao?style=for-the-badge)](https://github.com/Apprendendo/assistente-recomendacao/issues)
[![GitHub donate](https://img.shields.io/github/sponsors/clcmo?color=pink&style=for-the-badge)](https://github.com/sponsors/clcmo)

Sistema inteligente de recomendação personalizada desenvolvido com tecnologias modernas. Este projeto demonstra a integração entre um app mobile React Native/Expo, backend Python FastAPI e APIs de IA (Claude, GPT, Gemini) para fornecer sugestões personalizadas aos usuários.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Começando](#-começando)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Funcionalidades](#-funcionalidades)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

## 🎯 Sobre o Projeto

O Assistente de Recomendação é uma aplicação mobile full-stack que utiliza APIs de inteligência artificial para fornecer recomendações personalizadas. O sistema permite que usuários digitem suas preferências e recebam sugestões detalhadas geradas por modelos de IA de ponta.

### Características principais:

- App mobile nativo para iOS e Android
- Suporte para 3 APIs de IA diferentes (Claude, GPT, Gemini)
- Interface intuitiva e moderna
- API RESTful robusta com FastAPI
- Processamento em tempo real
- Feedback visual durante carregamento

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

### Frontend

- **React Native** - Framework para apps mobile
- **Expo** - Plataforma de desenvolvimento React Native
- **TypeScript** - Superset tipado do JavaScript
- **NativeWind (TailwindCSS)** - Estilização utilitária para React Native

### Backend

- **Python 3.8+** - Linguagem de programação
- **FastAPI** - Framework web moderno e rápido
- **Uvicorn** - Servidor ASGI de alta performance
- **Pydantic** - Validação de dados
- **OpenAI API** - Integração com GPT
- **Anthropic API** - Integração com Claude
- **Google Gemini API** - Integração com Gemini

### Ferramentas e DevOps

- **Git & GitHub** - Controle de versão
- **GitHub Actions** - CI/CD
- **ESLint & Prettier** - Qualidade de código
- **Jest** - Testes unitários

## 📁 Estrutura do Projeto

```txt
assistente-recomendacao/
├── .github/              # Configurações do GitHub (workflows, CI/CD)
├── backend/              # API Python com FastAPI
│   ├── venv/            # Ambiente virtual Python
│   ├── main.py          # Aplicação principal FastAPI
│   ├── requirements.txt # Dependências Python
│   ├── setup.sh         # Script de instalação
│   └── .env            # Variáveis de ambiente (não commitado)
├── frontend/            # App mobile React Native + Expo
│   ├── app/            # Rotas e telas do app
│   ├── components/     # Componentes reutilizáveis
│   │   ├── styles.tsx
│   │   ├── preferences.tsx
│   │   └── recommendations.tsx
│   ├── services/       # Serviços e APIs
│   │   └── api.tsx
│   ├── tsconfig.json   # Configuração TypeScript
│   ├── tailwind.config.js
│   └── package.json    # Dependências do frontend
├── docs/               # Documentação do projeto
├── .gitignore         # Arquivos ignorados pelo Git
├── .env               # Variáveis de ambiente globais
├── .releaserc.json    # Configuração de releases
├── package.json       # Configurações do monorepo
├── LICENCE           # Licença MIT
└── README.md         # Este arquivo
```

## 🏁 Começando

Estas instruções fornecerão uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Python** 3.8 ou superior
- **pip** (gerenciador de pacotes Python)
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Git**
- **Expo Go** (app no celular) - para testar o app mobile

Verifique as versões instaladas:

```bash
python3 --version
pip --version
node --version
npm --version
git --version
```

## 💻 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Apprendendo/assistente-recomendacao.git
cd assistente-recomendacao
```

### 2. Configure o arquivo .gitignore

Certifique-se de que o `.gitignore` na raiz do projeto contenha:

```txt
.venv/
venv/
node_modules/
__pycache__/
.env
.expo/
```

### 2. Configure o Backend (Python FastAPI)

```bash
cd backend
```

#### Opção 1: Usando o script de setup (Recomendado)

```bash
chmod +x setup.sh
./setup.sh
```

#### Opção 2: Instalação manual

```bash
# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente virtual
# No Linux/Mac:
source venv/bin/activate
# No Windows:
# venv\Scripts\activate

# Instalar dependências
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` **na raiz do projeto** (não no backend):

```env
# Escolha qual API usar: "anthropic", "openai" ou "gemini"
API_CHOICE=anthropic

# Tokens das APIs (obtenha em suas respectivas plataformas)
ANTHROPIC_TOKEN=sua_chave_anthropic_aqui
OPENAI_TOKEN=sua_chave_openai_aqui
GEMINI_TOKEN=sua_chave_gemini_aqui
```

**Onde obter os tokens:**

- **Anthropic (Claude)**: https://console.anthropic.com/
- **OpenAI (GPT)**: https://platform.openai.com/api-keys
- **Google (Gemini)**: https://ai.google.dev/

### 4. Configure o Frontend (React Native + Expo)

```bash
cd ../frontend
npm install
# ou
yarn install
```

**Arquivos importantes já configurados:**

- `tsconfig.json` - Configuração TypeScript com paths
- `tailwind.config.js` - Configuração do NativeWind
- `components/styles.tsx` - Estilos e cores globais
- `components/preferences.tsx` - Input de preferências
- `components/recommendations.tsx` - Exibição de resultados
- `services/api.tsx` - Comunicação com backend

### 5. Execute o projeto

#### Backend (em um terminal):

```bash
cd backend

# Ative o ambiente virtual primeiro
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Inicie o servidor
uvicorn main:app --reload
```

O backend estará rodando em `http://localhost:8000`

#### Frontend (em outro terminal):

```bash
cd frontend
npx expo start
```

**Opções para testar o app:**

- Pressione `w` para abrir no navegador web
- Pressione `a` para abrir no emulador Android
- Pressione `i` para abrir no simulador iOS (Mac)
- Escaneie o QR Code com o app **Expo Go** no seu celular:
  - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

## 📖 Uso

### Testando o App

Após iniciar ambos os servidores:

1. **Backend**: Certifique-se de que `http://localhost:8000` está rodando
2. **Frontend**: Abra o app no Expo Go (celular) ou navegador
3. Digite suas preferências (ex: "filmes de ação e aventura")
4. Clique em "Gerar Recomendações"
5. Aguarde enquanto a IA processa seu pedido
6. Visualize suas recomendações personalizadas!

### Testando em diferentes dispositivos

**No celular físico (Recomendado):**

- Baixe o app Expo Go
- Escaneie o QR Code gerado por `npx expo start`
- O app será carregado automaticamente

**No navegador web:**

- Execute `npx expo start`
- Pressione `w` para abrir versão web

**Em emuladores:**

- Android: Pressione `a` (requer Android Studio)
- iOS: Pressione `i` (requer Xcode - apenas Mac)

### Exemplos de API

O backend FastAPI oferece os seguintes endpoints:

#### 1. Verificar status da API

```bash
curl http://localhost:8000/
```

Resposta:

```json
{
  "message": "API funcionando!",
  "api_em_uso": "anthropic",
  "token_loaded": true,
  "endpoints": ["/", "/recommend (GET)", "/recommend (POST)"]
}
```

#### 2. Obter recomendações (POST)

```bash
curl -X POST http://localhost:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{"preferences": "filmes de ação e aventura"}'
```

Resposta:

```json
{
  "recommendations": "1. Mad Max: Fury Road - ...\n2. Indiana Jones - ...",
  "api_used": "anthropic"
}
```

#### 3. Informações do endpoint (GET)

```bash
curl http://localhost:8000/recommend
```

### APIs Suportadas

O projeto suporta três APIs de IA. Configure a variável `API_CHOICE` no `.env`:

- **Anthropic Claude** - `API_CHOICE=anthropic` (modelo: claude-sonnet-4)
- **OpenAI GPT** - `API_CHOICE=openai` (modelo: gpt-3.5-turbo)
- **Google Gemini** - `API_CHOICE=gemini` (modelo: gemini-2.5-flash)

## ✨ Funcionalidades

- [x] App mobile multiplataforma (iOS e Android)
- [x] Sistema de recomendações com IA
- [x] Suporte para múltiplas APIs (Claude, GPT, Gemini)
- [x] Interface nativa moderna e responsiva
- [x] API FastAPI rápida e assíncrona
- [x] Configuração simplificada com variáveis de ambiente
- [x] CORS configurado para desenvolvimento
- [x] Feedback visual durante carregamento
- [x] Tratamento de erros amigável
- [ ] Sistema de autenticação
- [ ] Histórico de recomendações
- [ ] Modo offline
- [ ] Compartilhamento de recomendações

## 🧪 Testes

### Backend

```bash
cd backend
source venv/bin/activate  # Ativar ambiente virtual

# Testar endpoints manualmente
curl http://localhost:8000/
curl -X POST http://localhost:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{"preferences": "filmes de ficção científica"}'
```

### Frontend

O Expo permite testes em tempo real:

```bash
cd frontend
npx expo start

# Opções de teste:
# - Pressione 'r' para reload
# - Pressione 'd' para abrir developer menu
# - Pressione 'j' para abrir debugger
```

### Estrutura de Componentes

```txt
frontend/
├── app/
│   ├── _layout.tsx      # Layout principal e navegação
│   └── index.tsx        # Tela principal do app
├── components/
│   ├── styles.tsx       # Estilos e cores globais
│   ├── preferences.tsx  # Input de preferências
│   └── recommendations.tsx  # Exibição de resultados
└── services/
    └── api.tsx          # Chamadas à API backend
```

## 📦 Build para Produção

### Backend

O FastAPI já está pronto para produção. Para deploy:

```bash
cd backend
source venv/bin/activate

# Opção 1: Com Uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000

# Opção 2: Com Gunicorn + Uvicorn Workers
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend

Para build de produção do app Expo:

```bash
cd frontend

# Build para Android
eas build --platform android

# Build para iOS
eas build --platform ios

# Build para ambos
eas build --platform all
```

Para mais informações sobre deploy, consulte a [documentação do Expo EAS](https://docs.expo.dev/build/introduction/).

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você quer contribuir com o projeto, siga estes passos:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

Leia [CONTRIBUTING.md](docs/CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENCE) para mais detalhes.

## 👥 Autores

- **Camila Oliveira** - *Desenvolvedora Web, Mobile e Professora* - [@clcmo](https://github.com/clcmo)

Veja também a lista de [contribuidores](https://github.com/Apprendendo/assistente-recomendacao/contributors) que participaram deste projeto.

## 📞 Contato

- Website: [dev.camilaloliveira.me](https://dev.camilaloliveira.me/)
- Blog: [apprendendo.blog](https://apprendendo.blog/)
- Ko-fi: [ko-fi.com/clcmo](https://ko-fi.com/clcmo)

## 🙏 Agradecimentos

- Inspiração para o projeto
- Bibliotecas e frameworks utilizados
- Comunidade open source

---

⭐️ Se este projeto foi útil para você, considere dar uma estrela no repositório!

**[⬆ Voltar ao topo](#-assistente-de-recomendação---aula-teste-2026)**