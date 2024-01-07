# Kullanılacak temel imajı belirt
FROM node:14


# Uygulama dosyalarını kopyala
COPY package.json .
COPY . .

# Bağımlılıkları yükle
RUN npm install

# Uygulamayı çalıştır
CMD ["npm", "start"]
