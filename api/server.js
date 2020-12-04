const express = require('express');
const server = express();

//const Projects = require('./projects/projects-router')
const Actions = require('./actions/actions-router')

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
//server.use("api/projects", Projects);
server.use("/api/actions", Actions);

module.exports = server;
 