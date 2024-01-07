# Kullanılacak temel imajı belirt
FROM node:14

# Worker dosyalarını kopyala
COPY package.json .
COPY . .

# Bağımlılıkları yükle
RUN npm install

# Worker uygulamasını çalıştır
CMD ["npm", "start"]
