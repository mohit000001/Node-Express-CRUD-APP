FROM node:16
WORKDIR /app
RUN npm install --global nodemon
RUN npm install typescript -g
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD ["npm", "start"] 