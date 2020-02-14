console.log(`this is npm run server server.js`)

const express = require("express");
const projectsRouter = require("./data/helpers/projects-router")

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>is it working????</h2>`);
})

server.use("/projects", projectsRouter);




module.exports = server;
