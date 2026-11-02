FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/api/package.json backend/api/package.json
RUN npm ci

COPY frontend ./frontend

EXPOSE 3000

CMD ["npm", "run", "dev", "--workspace=@markytics/frontend"]
