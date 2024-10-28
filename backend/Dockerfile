FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:16

WORKDIR /app

COPY --from=build /app .

COPY wait-for-it.sh /usr/local/bin/wait-for-it

RUN chmod +x /usr/local/bin/wait-for-it

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 3001
