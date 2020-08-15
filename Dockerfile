FROM node:alpine
# WORKDIR '/app'

# COPY package.json .
# RUN npm install

# COPY . .
# CMD ["nodemon","index.js"]
ENV APP_ROOT=/opt/app-root 
WORKDIR /opt/app-root 
COPY . .

USER 1001
ENTRYPOINT ["node", "index.js"]