FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["sh", "./wait-for-it.sh", "postgres:5432", "--", "node", "src/index.js"]
