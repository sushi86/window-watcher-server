FROM node:20.5.1-alpine AS final
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
ENV NODE_ENV=production
RUN npm install --omit=dev
CMD [ "npm", "start" ]