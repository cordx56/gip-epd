FROM arm32v6/node:12-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

CMD ["yarn", "start"]
