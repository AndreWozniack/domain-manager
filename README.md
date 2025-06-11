# Gerenciador de Domínios - Monorepo Laravel + Next.js

Este projeto é uma aplicação fullstack composta por:

- **Backend:** PHP 8.2 com Laravel 12
- **Frontend:** Next.js com TypeScript
- **Serviços:** NGINX como proxy reverso, MySQL como banco de dados
- **Containerização:** Docker

---

## Tecnologias e Ferramentas

- Laravel 12
- Next.js
- MySQL
- NGINX
- Docker & Docker Compose
- TailwindCSS, TypeScript
- Laravel Sanctum (para autenticação)

---

## Estrutura do Projeto

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

## Como Executar o Projeto com Docker

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
APP_KEY= # será preenchido automaticamente
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

As vezes é necessário esperar o PHP terminar de rodar o composer install e os migrates e seeds, dependendo da maquina varia um pouco a velocidade, o que de inicio pode causar um pequeno erro no front. Basta apenas o volume app terminar de rodar os scripts iniciais que tudo ira funcioanr corretamente.

---

## Acesso

- Frontend: http://localhost:3000
- Backend (Laravel via NGINX): http://localhost:8080
- Banco de Dados (MySQL): localhost:3307
---

## Login de Teste

Para testar a autenticação, utilize as seguintes credenciais:

```bash
email: admin@admin.com
senha: secret123
```
Também é possivel criar novos usuários através do frontend.

## 🔍 Observações Técnicas

- O projeto utiliza **NGINX** como proxy reverso para o backend Laravel, o que simula um ambiente de produção real e permite melhor roteamento de requisições.
- A autenticação foi implementada com **Laravel Sanctum**, que oferece autenticação baseada em sessão, integrada ao frontend via cookies com segurança.
- O **backend** segue uma arquitetura limpa, organizada em camadas como **Repositories**, **Services** e **Http**, facilitando testes e manutenção.
- O **frontend** em Next.js está estruturado com **contexts**, **services** e **componentes reutilizáveis**, usando o novo App Router e boas práticas de modularização.

---

## Autor

Desenvolvido por André Wozniack
