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

router.post("/", validateProj, (req, res) => {
  
  projectsData
  .insert(req.body)
  .then(newProj => {
    if(!newProj){
      res.status(400).json({ error: "something went wrong"})
    } else {
      res.status(201).json(newProj)  
    }
  })
  .catch(err => {
    res.status(500).json({ error: "something wrong with the server" `${err}`})
  })



})

// custom middleware

function validateProjId(req, res, next){
  const { id } = req.params;

  projectsData
  .get(id)
    .then(proj => {  
      if(!proj) {
        res.status(404).json({ error: "No project with this ID exists" })
      } else {
        next();      
      }      
    })
    .catch(err => {
      console.log(err)
    })
}


function validateProj(req, res, next){
  const { id } = req.params;
  const { name, description } = req.body
  console.log(`VALIDATE PROJ`, req.body)

  if(!req.body){
    res.status(404).json({ error: "No project with this exists" })
  } else if (!name || !description) {
    res.status(404).json({ error: "please provide name AND description fields" })
  } else {
    next();
  }
}

module.exports = router;

