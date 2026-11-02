FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/api/package.json backend/api/package.json
RUN npm ci

COPY frontend ./frontend
COPY backend/api ./backend/api

RUN npm run build --workspace=@markytics/frontend

ENV NODE_ENV=production
EXPOSE 10000

CMD ["npm", "run", "start", "--workspace=@markytics/backend-api"]
