FROM php:8.3-cli

# 日本語ロケールのインストール
RUN apt-get update && apt-get install -y \
    locales \
    git \
    zip \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    libpq-dev \
    libc-client-dev \    
    libkrb5-dev \
    libssl-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# 日本語ロケールの生成と設定
RUN locale-gen ja_JP.UTF-8 \
    && localedef -f UTF-8 -i ja_JP ja_JP.UTF-8

ARG APP_NAME
ARG APP_KEY
ARG APP_DEBUG
ARG APP_TIMEZONE
ARG APP_URL
ARG FRONTEND_URL
ARG APP_LOCALE
ARG APP_FALLBACK_LOCALE
ARG APP_FAKER_LOCALE
ARG PHP_CLI_SERVER_WORKERS
ARG BCRYPT_ROUNDS
ARG DB_CONNECTION
ARG DATABASE_URL
ARG DB_HOST
ARG DB_PORT
ARG DB_DATABASE
ARG DB_USERNAME
ARG DB_PASSWORD
ARG VITE_APP_NAME

ENV APP_NAME=${APP_NAME}
ENV APP_KEY=${APP_KEY}
ENV APP_DEBUG=${APP_DEBUG}
ENV APP_TIMEZONE=${APP_TIMEZONE}
ENV APP_URL=${APP_URL}
ENV FRONTEND_URL=${FRONTEND_URL}
ENV APP_LOCALE=${APP_LOCALE}
ENV APP_FALLBACK_LOCALE=${APP_FALLBACK_LOCALE}
ENV APP_FAKER_LOCALE=${APP_FAKER_LOCALE}
ENV PHP_CLI_SERVER_WORKERS=${PHP_CLI_SERVER_WORKERS}
ENV BCRYPT_ROUNDS=${BCRYPT_ROUNDS}
ENV DB_CONNECTION=${DB_CONNECTION}
ENV DATABASE_URL=${DATABASE_URL}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_DATABASE=${DB_DATABASE}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV VITE_APP_NAME=${VITE_APP_NAME}

ENV LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8

# PHP拡張機能のインストール
RUN docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# PHPの設定カスタマイズ
RUN echo "\
    max_execution_time = 900\n\
    max_input_time = 900\n\
    memory_limit = 2G\n\
    post_max_size = 1000M\n\
    upload_max_filesize = 1000M\n\
    default_socket_timeout = 900\
    " > /usr/local/etc/php/conf.d/docker-php-custom.ini

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリの設定
WORKDIR /app

# アプリケーションファイルのコピー
COPY ./backend .

# Composerの依存関係インストール
RUN composer install --ignore-platform-req=ext-gd

# Expose port 8000 for the Laravel development server
EXPOSE 8000

# Copy the shell script into the container
COPY ./docker/startup.sh /startup.sh

# Make the script executable
RUN chmod +x /startup.sh

# Set the script as the entry point
ENTRYPOINT ["/startup.sh"]

