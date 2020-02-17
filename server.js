console.log(`this is npm run server server.js`)

const express = require("express");
const projectsRouter = require("./data/helpers/projects-router")
const actionsRouter = require("./data/helpers/actions-router")

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>is it working????</h2>`);
})

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

const port = 4000
server.listen(port, () => console.log(`Server in index.js listening on port:`, port))
