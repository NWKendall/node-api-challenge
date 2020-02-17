const express = require("express");
const projectsData = require("./projectModel");
const actionsData = require("./actionModel");

const router = express.Router();

router.get("/", (req, res) => {
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

router.put("/:id", validateProjId, validateProj, (req, res) => {
  const { id } = req.params;
  
  projectsData
  .update(id, req.body)
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

router.delete("/:id", validateProjId, (req, res) => {

  const { id } = req.params;
  projectsData
  .remove(id)
    .then(rem => {      
      res.status(200).json(rem)         
    })
    .catch(err => {
      console.log(err)
    })
})




router.post("/:id", validateAction, (req, res) => { 

  const { id } = req.params;
  const newAction = { ...req.body, project_id: id }
  actionsData
  .insert(newAction)
  .then(newAct => {
    if(!newAct){
      res.status(400).json({ error: "something went wrong"})
    } else {
      res.status(201).json(newAct)  
    }
  })
  .catch(err => {
    console.log(err)
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


function validateAction(req, res, next){
  const { description, notes } = req.body
  console.log(`VALIDATE ACTION`, req.body)

  if(!req.body){
    res.status(404).json({ error: "No action with this exists" })
  } else if (!description || !notes) {
    res.status(404).json({ error: "please provide description AND notes fields" })
  } else {
    next();
  }
}
module.exports = router;

