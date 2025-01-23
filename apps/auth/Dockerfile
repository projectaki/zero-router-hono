FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/auth/package*.json ./apps/auth/
COPY tsconfig.internal.json ./

RUN npm ci

COPY apps/auth ./apps/auth
COPY packages/ ./packages/

RUN npm run build --workspace @local/db
RUN npm run build --workspace @local/utils
RUN npm run build --workspace @local/auth

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/apps/auth/dist ./apps/auth/dist
COPY --from=builder /app/apps/auth/package*.json ./apps/auth/

COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/db/package*.json ./packages/db/

COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/utils/package*.json ./packages/utils/

COPY --from=builder /app/package*.json ./

RUN npm ci --only=production

EXPOSE 3000

RUN chown -R node:node /app
USER node

# Create the directory and set permissions
RUN mkdir -p /app/data && chmod 777 /app/data

CMD ["npm", "run", "serve", "--workspace", "@local/auth"]
