const express = require("express");
const actionsData = require("./actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  actionsData
  .get()
    .then(actions => {
      if(!actions) {
        res.status(400).json({ error: "no actions data exists!"})
      } else {
        res.status(200).json(actions)
      }      
    })
    .catch(err => {
      console.log(err)
    })
});

router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params
  actionsData
  .get(id)
    .then(actions => {      
      res.status(200).json(actions)         
    })
    .catch(err => {
      console.log(err)
    })
});


router.put("/:id", validateActionId, validateAction, (req, res) => {
  const { id } = req.params;
  
  actionsData
  .update(id, req.body)
  .then(newProj => {
    if(!newProj){
      res.status(400).json({ error: "something went wrong"})
    } else {
      res.status(201).json(newProj)  
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "something wrong with the server" })
  })
})

router.delete("/:id", validateActionId, (req, res) => {

  const { id } = req.params;
  actionsData
  .remove(id)
    .then(rem => {      
      res.status(200).json(rem)         
    })
    .catch(err => {
      console.log(err)
    })
})

// custom middleware
function validateActionId(req, res, next){
  const { id } = req.params;

  actionsData
  .get(id)
    .then(proj => {  
      if(!proj) {
        res.status(404).json({ error: "No action with this ID exists" })
      } else {
        next();      
      }      
    })
    .catch(err => {
      console.log(err)
    })
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

