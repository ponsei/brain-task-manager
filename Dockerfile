FROM node:20-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache make gcc g++ python3

WORKDIR /nextjs-app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
