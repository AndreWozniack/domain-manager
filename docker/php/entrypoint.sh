#!/bin/sh

set -e


composer install


echo "🛠  Executando migrations..."
php artisan migrate --force

echo "🌱  Executando seeders..."
php artisan db:seed --force



exec "$@"
