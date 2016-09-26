FROM node:argon

MAINTAINER leomonteiro92@gmail.com

RUN useradd --user-group --create-home --shell /bin/false app & npm install --global npm@3.7.5

ENV HOME=/home/app

COPY package.json $HOME/src/
RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/src

RUN npm cache clean && npm install --silent --progress=false

USER root

COPY . $HOME/src
RUN chown -R app:app $HOME/*

USER app

CMD ["npm", "start"]
