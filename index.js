console.log(`this is npm START index.js`)
const server = require("./server");

const port = process.env.PORT || 4000
server.listen(port, () => console.log(`Server in index.js listening on port:`, port))


