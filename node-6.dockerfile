FROM node:6
ADD ./package.json /vizjs/package.json
WORKDIR /vizjs
RUN npm install
ADD . /vizjs
RUN npm test
