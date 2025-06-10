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
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=backend
DB_USERNAME=root
DB_PASSWORD=secret

SESSION_DRIVER=database
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
```

Você pode copiar e editar rapidamente com:
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

### 4. Configure a aplicação Laravel

Acesse o container do app e rode os comandos:

```bash
docker exec -it nome-do-container-app sh
php artisan key:generate
php artisan migrate
```

> Dica: use `docker ps` para ver o nome do container, ou nomeie ele com `container_name:` no `docker-compose.yml`.

---

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
