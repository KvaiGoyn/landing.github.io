FROM node:24-slim AS builder

WORKDIR /workspace

# Установка всех зависимостей (включая devDependencies для сборки)
COPY package*.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Production stage
FROM node:24-slim

WORKDIR /workspace

# Установка только production зависимостей
COPY package*.json ./
RUN npm ci --only=production

# Копирование собранного приложения из builder
COPY --from=builder /workspace/.next ./.next
COPY --from=builder /workspace/public ./public
COPY --from=builder /workspace/package.json ./package.json
COPY --from=builder /workspace/next.config.ts ./next.config.ts

# Запуск приложения
CMD ["npm", "start"]