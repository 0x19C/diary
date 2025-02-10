#!/usr/bin/env bash

# Run migrations without passing "php" as an argument
php artisan migrate

# Run storage link to public
php artisan storage:link

# Start the Laravel development server
php artisan serve --host=0.0.0.0 --port=8000
