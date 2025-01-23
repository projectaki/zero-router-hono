## Development
```
npm i
.env.example -> .env
docker compose up -d
npm run db:push
npm run dev
```

if left unchanged: http://localhost:5173. 
auth codes are visible in console locally.

## Preview

Run deploy script, which runs the "production" docker compose file, runs migrations, builds spa and copies it to the directory where a webserver can serve it from.

Locally the copy will fail but this is fine, you can just serve with vite preview.

```
./docker/.env.example -> ./docker/.env
./scripts/deploy.sh
npm run preview
```

auth codes are visible in docker in the auth service logs.
## Production
```
Assuming you have the repo cloned on a VPS. You would normally use a webserver like nginx/Caddy to serve the app.

ensure the .env file is set up correctly in docker/.env, and match the domains/ports you set up in your webserver config.

run ./scripts/deploy.sh
- builds the zero schema
- starts the docker containers
- runs the database migrations
- builds the app
- copies the app to the directory where Caddy will serve it from

Caddy is configured at /etc/caddy/Caddyfile
A custom domain is set up for the sync url
A custom domain is set up for the app
A custom domain is set up for auth server

Caddy will serve the app from /var/www/<app-name>
Caddy will proxy requests from the custom domain/api/* to the api service

It can also work without custom domains, but then the VPS needs to whitelist the ports that the sync service, and app is running on.
```


## PWA

For simple pwa and offline support install `vite-plugin-pwa` and uncomment the configs in vite.config.ts. I disable this for development.