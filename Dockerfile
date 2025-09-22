# Dockerfile (prod)
# 1) BUILD
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# (se usa Prisma Client)
# RUN npx prisma generate
RUN npm run build
# remove devDeps para runtime
RUN npm ci --omit=dev

# 2) RUNTIME
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]
