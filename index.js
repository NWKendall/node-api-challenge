console.log(`this is npm START index.js`)

const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  const test = [ { test: "IT's WORKING" }]
  res.status(200).json(test)
})

const port = process.env.PORT || 5000
server.listen(port, (req, res) => console.log(`Server in index.js listening on port:`, port))


