# Sử dụng Node.js làm base image
FROM node:16

# Cài đặt thư viện cần thiết
WORKDIR /app

# Copy các file vào container
COPY ./app/package.json ./app/package-lock.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY ./app /app

# Mở cổng 5000 cho server
EXPOSE 5000

# Chạy server
CMD ["node", "server.js"]
