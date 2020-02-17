const express = require("express");
const projectsRouter = require("./data/helpers/projectsRouter");
const actionsRouter = require("./data/helpers/actionRouter")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ test: "it's working"})
})

server.use("/projects", projectsRouter)
server.use("/actions", actionsRouter)


const port = 7000
server.listen(port, () => console.log(`Server working on port: ${port}`))