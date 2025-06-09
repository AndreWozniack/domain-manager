FROM composer:2.7 AS vendor

WORKDIR /app

# só copia o composer.* para acelerar cache
COPY backend/composer.json backend/composer.lock ./

# instala dependências sem dev e otimizado
RUN composer install \
    --no-dev --prefer-dist --no-interaction --no-scripts --optimize-autoloader


FROM php:8.4-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql bcmath


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html


COPY --from=vendor /app/vendor ./vendor

COPY backend/ ./

RUN composer dump-autoload --optimize

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
