#!/bin/bash

set -e

echo "🔄 Starting deployment..."

echo "🐳 Building zero schema..."
npx dotenv -e docker/.env -- npm run build-schema --workspace=@local/app
echo "✅ Zero schema build complete"
cat docker/zero-schema.json

echo "🐳 Building and starting Docker containers..."
docker compose -f ./docker/docker-compose.yml up --build -d
echo "✅ Docker containers are up and running"

echo "🐳 Running database migrations..."
npx dotenv -e docker/.env -- npm run db:push --workspace=@local/db
echo "✅ Database migrations complete"

echo "🏗️ Building web app..."
npx dotenv -e docker/.env -- npm run build --workspace=@local/app
echo "✅ Web app build complete"

echo "🐳 Copying web app to /var/www/app..."
rm -rf /var/www/app
mkdir -p /var/www/app
cp -r apps/app/dist/* /var/www/app
echo "✅ Web app copied to /var/www/app"

echo "🚀 Deployment completed successfully!"
