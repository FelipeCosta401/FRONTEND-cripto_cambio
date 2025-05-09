# Etapa 1: build da aplicação
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: imagem final com servidor estático
FROM nginx:alpine

# Copia os arquivos estáticos gerados para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove a configuração padrão do Nginx e copia uma customizada (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
