const express = require("express");
const projectsData = require("./projectModel");
const router = express.Router();


router.get("", (req, res) => {
  projectsData
  .get()
    .then(projects => {
      if(!projects) {
        res.status(400).json({ error: "no projects data exists!"})
      } else {
        res.status(200).json(projects)
      }      
    })
    .catch(err => {
      console.log(err)
    })
})


router.get("/:id", validateProjId, (req, res) => {
  const { id } = req.params
  projectsData
  .get(id)
    .then(projects => {      
      res.status(200).json(projects)         
    })
    .catch(err => {
      console.log(err)
    })
})

// custom middleware

function validateProjId(req, res, next){
  const { id } = req.params;

  projectsData
  .get(id)
    .then(proj => {  
      if(!proj)    {
        res.status(404).json({ error: "No project with this ID exists" })
      } else {
        next();      
      }      
    })
    .catch(err => {
      console.log(err)
    })
}


module.exports = router;

