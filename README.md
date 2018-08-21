# Antdesign Sample

> Antdesign - React - Redux

## Build Setup

## running on local
- npm install
- copy env.dists to .env
- npm start

## running on server production and build for production with minification
- Install pm2 server [npm install -g pm2]
- npm install
- copy env.dists to .env
- npm run build
- sudo pm2 start server.js -i 0 --name 'r-antdesign-sample'
```
