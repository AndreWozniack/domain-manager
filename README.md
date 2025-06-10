# Gerenciador de dominios - Monorepo Laravel + Next.js

Este projeto é uma aplicação fullstack composta por:

- **Backend:** Laravel 12
- **Frontend:** Next.js com TypeScript
- **Serviços:** NGINX como proxy reverso, MySQL como banco de dados
- **Containerização:** Docker e Docker Compose

---

## 🧰 Tecnologias e Ferramentas

- Laravel 12
- Next.js 13+
- MySQL 8.4
- NGINX
- Docker & Docker Compose
- TailwindCSS, TypeScript
- Laravel Sanctum (para autenticação)

---

## 🗂 Estrutura do Projeto

```
/
├── backend/           # Projeto Laravel
│   ├── app/
│   └── ...
├── frontend/          # Projeto Next.js
│   ├── app/
│   └── ...
├── docker/            # Configurações de Docker e NGINX
│   ├── php/Dockerfile
│   └── nginx/conf.d/
└── docker-compose.yml
```

---

## ⚙️ Como Executar o Projeto com Docker

### 1. Clone o repositório
```bash
git clone https://github.com/AndreWozniack/domain-manager.git
cd domain-manager
```

### 2. Configure as variáveis de ambiente

Crie o arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```env
# backend/.env
APP_NAME=Laravel
APP_ENV=local
APP_KEY= #sera preenchido automaticamente
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=secret

SESSION_DRIVER=database
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000

```

Você pode copiar rapidamente com:
```bash
cp backend/.env.example backend/.env
```

### 3. Suba os containers

```bash
docker-compose up --build
```

Isso irá:

- Rodar o Laravel na porta `8080`
- Rodar o Next.js na porta `3000`
- Configurar o banco de dados MySQL na porta `3307`

## 🌐 Acesso

- Frontend: [http://localhost:3000](http://localhost:3000)

---

## ✅ Funcionalidades

- Autenticação com Laravel Sanctum
- Integração total entre frontend e backend
- Ambientes isolados com Docker
- Banco de dados persistente com volumes
- NGINX como proxy reverso

---

## 📦 Volumes Utilizados

- `db_data`: volume persistente do banco MySQL
- `vendor_app`: volume compartilhado dos vendors do Laravel

---

## 👨‍💻 Autor

Desenvolvido por André Wozniack
