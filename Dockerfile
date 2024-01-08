# Kullanılacak temel imajı belirt
FROM node:14

# Çalışma dizinini belirle
WORKDIR /usr/src/app

# Uygulama dosyalarını kopyala
COPY package.json .
COPY package-lock.json .
COPY . .

# Bağımlılıkları yükle
RUN npm install

# Uygulamayı çalıştır
CMD ["npm", "start"]
