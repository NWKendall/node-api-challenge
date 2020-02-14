const express = require("express");
const projectData = require("./projectModel");

const router = express.Router();


router.get("/", (req, res) => {
  console.log(req)

  projectData
  .get()
    .then(projects => {
      console.log(projects)
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(`this is get all prjects error`, err)
      res.status(500).json.apply({ error: "SOMETHING WENT WRONG!" })
    })
})

module.exports = router;
