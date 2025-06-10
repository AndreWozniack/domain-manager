# 1) Vendor build
FROM composer:2.7 AS vendor
WORKDIR /app

COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts --optimize-autoloader

# 2) App image
FROM php:8.4-fpm-alpine
WORKDIR /var/www/html

RUN apk add --no-cache \
      libzip-dev zlib-dev oniguruma-dev \
  && apk add --no-cache --virtual .build-deps \
      autoconf g++ make gcc \
  && docker-php-ext-install \
      pdo pdo_mysql zip bcmath \
  && pecl install redis \
  && docker-php-ext-enable redis \
  && apk del .build-deps


COPY backend/ ./
COPY --from=vendor /app/vendor ./vendor
COPY --from=vendor /usr/bin/composer /usr/bin/composer

#Optional: Adicionar entrypoint mais tarde
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
