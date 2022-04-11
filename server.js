const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;
app.listen(port);

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('public/db/db.json'); // <== Will be created later
const middlewares = jsonServer.defaults();
const dbPort = process.env.PORT || 3004; // <== You can change the port

server.use(middlewares);
server.use(router);

server.listen(port);