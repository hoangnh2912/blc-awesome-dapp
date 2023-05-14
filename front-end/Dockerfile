FROM node:16
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs yarn
WORKDIR /usr/src/app


COPY . .
RUN yarn install

EXPOSE 3000

CMD [ "yarn", "dev"]