#!/bin/sh
set -e

echo "Aguardando MySQL iniciar..."
until php -r "new PDO('mysql:host=db;dbname=laravel', 'root', 'secret');" >/dev/null 2>&1; do
  sleep 1
  echo -n "."
done
echo "MySQL disponível!"

[ -f .env ] || cp .env.example .env

# Gera chave se necessário
if ! grep -q "^APP_KEY=base64" .env; then
    echo "Gerando APP_KEY..."
    php artisan key:generate --ansi
fi

composer install

echo "Executando migrations..."
php artisan migrate --force

echo "Executando seeders..."
php artisan db:seed --force

exec "$@"
