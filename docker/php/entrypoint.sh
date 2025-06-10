#!/bin/sh

set -e

if ! grep -q "^APP_KEY=base64" .env; then
    echo "🔑  Gerando APP_KEY..."
    php artisan key:generate --ansi
fi

composer install

echo "🛠  Executando migrations..."
php artisan migrate --force

echo "🌱  Executando seeders..."
php artisan db:seed --force

exec "$@"
