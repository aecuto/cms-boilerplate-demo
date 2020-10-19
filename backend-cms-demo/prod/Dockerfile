FROM node:12-alpine

RUN apk update \
 && apk upgrade \
 && apk add --no-cache curl

# Create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Bundle app source
COPY . .

RUN chown -R node:node /home/node/app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

# Change Operate User
USER node

RUN yarn --production

EXPOSE 8000

CMD /wait && yarn start

HEALTHCHECK --start-period=120s --interval=5s --timeout=10s --retries=3 CMD curl -sS http://127.0.0.1:8000/health || exit 1
