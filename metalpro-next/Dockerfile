FROM node:24-slim AS builder

WORKDIR /workspace

# Копируем .npmrc для отключения аудита/сбора средств
COPY .npmrc package*.json ./
RUN npm ci --no-audit --no-fund

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Production stage
FROM node:24-slim

ENV NODE_ENV=production

WORKDIR /workspace

# Копируем .npmrc и устанавливаем только production зависимости
COPY .npmrc package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Копирование собранного приложения из builder
COPY --from=builder /workspace/.next ./.next
COPY --from=builder /workspace/public ./public
COPY --from=builder /workspace/package.json ./package.json
COPY --from=builder /workspace/next.config.ts ./next.config.ts

# Порт, на котором работает приложение
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]