console.log(`this is npm run server server.js`)

const express = require("express");

const server = express();

server.use(express.json());


const port = process.env.PORT || 5000
server.listen(port, (req, res) => console.log(`Server on server.js listening on port:`, port))


