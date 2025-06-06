FROM php:8.4-fpm-alpine

# Extensões necessárias
RUN docker-php-ext-install pdo pdo_mysql bcmath

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]