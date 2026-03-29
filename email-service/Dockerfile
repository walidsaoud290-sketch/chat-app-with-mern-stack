FROM php:8.1.9

WORKDIR /app

COPY composer.json composer.lock ./

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install

COPY . .

RUN chmod -R 777 storage bootstrap/cache


EXPOSE 8000


CMD ["php","artisan","serve","--host=0.0.0.0 ","--port=8000"]

