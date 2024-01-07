FROM php:8.1-apache
RUN apt-get update && apt-get install -y \
		libfreetype-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install -j$(nproc) mysqli pdo pdo_mysql && docker-php-ext-enable mysqli
RUN apt install -y \ 
		libmcrypt-dev \
	&& pecl install mcrypt

RUN apt install -y \
		libonig-dev \
	&& docker-php-ext-install -j$(nproc) mbstring

RUN a2enmod rewrite
RUN a2enmod headers

# WORKDIR /var/www/html
