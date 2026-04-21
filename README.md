# Pepê Desktop

App desktop nativo para o [Pepê AI](https://github.com/Joao-Matheus-Amorim/pepe-ai) — interface estilo Claude Desktop construída com Tauri + React + TypeScript.

## Visão Geral

O Pepê Desktop é o cliente visual do agente Pepê AI. Ele se comunica com a API REST do `pepe-ai` e oferece uma experiência de chat nativa no Windows, macOS e Linux — sem precisar de navegador.

```
Pepê Desktop (Tauri + React)
        │
        │ HTTP (fetch)
        ▼
  API REST (FastAPI)          ← pepe-ai/api_main.py
        │
        ▼
  PepeAgent (LangGraph)       ← cérebro autônomo
        │
        ├── Busca Web
        ├── Clima
        ├── Memória (ChromaDB)
        ├── Filesystem
        ├── Visão (screenshot)
        └── Execução de comandos
```

## Funcionalidades

- Interface de chat nativa (janela desktop real)
- Comunicação em tempo real com o agente Pepê
- Indicador de "Pepê está digitando..."
- Histórico de conversa por sessão
- Dark theme moderno
- Envio de mensagem com Enter ou botão
- Auto-scroll para última mensagem

## Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- [Rust + Cargo](https://www.rust-lang.org/tools/install)
- [pepe-ai](https://github.com/Joao-Matheus-Amorim/pepe-ai) rodando na porta `8000`
- Windows 10/11 com WebView2 (já incluso no Windows 11)

## Instalação

**1. Clone o repositório:**
```bash
git clone https://github.com/Joao-Matheus-Amorim/pepe-desktop.git
cd pepe-desktop
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Inicie o backend do Pepê AI:**
```bash
# Em outro terminal, no repositório pepe-ai:
uvicorn api_main:app --reload --port 8000
```

**4. Rode o app em modo desenvolvimento:**
```bash
npm run tauri dev
```

## Build (Executável)

Para gerar o instalador `.exe` para Windows:

```bash
npm run tauri build
```

O instalador será gerado em `src-tauri/target/release/bundle/`.

## Configuração da API

A URL e API key do backend são configuradas em `src/api/pepe.ts`:

```typescript
const BASE_URL = "http://localhost:8000";  // URL da API do pepe-ai
const API_KEY = "pepe-default-key";        // Deve coincidir com PEPE_API_KEY no .env do pepe-ai
```

## Estrutura do Repositório

```text
pepe-desktop/
  src/
    api/
      pepe.ts          # Funções de comunicação com a API
    App.tsx            # Componente principal (chat)
    App.css            # Estilos dark theme
    main.tsx           # Entry point React
  src-tauri/
    src/
      main.rs          # Entry point Rust/Tauri
    tauri.conf.json    # Configuração do app (nome, janela, permissões)
    Cargo.toml         # Dependências Rust
  index.html
  package.json
  vite.config.ts
  tsconfig.json
```

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework desktop | [Tauri 2](https://tauri.app) |
| Frontend | [React 18](https://react.dev) + TypeScript |
| Bundler | [Vite](https://vitejs.dev) |
| Backend | [pepe-ai](https://github.com/Joao-Matheus-Amorim/pepe-ai) (FastAPI) |
| Linguagem nativa | Rust |

## Desenvolvimento

### Modo dev (hot reload)
```bash
npm run tauri dev
```

### Apenas frontend (sem janela nativa)
```bash
npm run dev
# Acesse http://localhost:1420
```

### Build de produção
```bash
npm run tauri build
```

## Relacionado

- [pepe-ai](https://github.com/Joao-Matheus-Amorim/pepe-ai) — Backend do agente (obrigatório)

## Licença

MIT
