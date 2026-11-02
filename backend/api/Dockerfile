FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/api/package.json backend/api/package.json
RUN npm ci

COPY backend/api ./backend/api

EXPOSE 8000

CMD ["npm", "run", "start", "--workspace=@markytics/backend-api"]
