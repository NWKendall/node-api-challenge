const express = require("express");
const projectData = require("./projectModel");

const router = express.Router();


router.get("/", (req, res) => {
  projectData
  .get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(`this is get all prjects error`, err)
      res.status(500).json({ error: "SOMETHING WENT WRONG! WITH SERVER" })
    })
})

router.post("/", (req, res) => {
  
  const { id } = req.params
  const project = { ...req.body, id: id }

  console.log(`PROJECT`, project)

  if(!project){
    res.status(400).json({ message: "no project exists"})
  } else if (!project.name || !project.description){
    res.status(400).json({ message: "name or description field missing"})
  } else {
    projectData
    .insert(project)
    .then(newProj => {
      !newProj ?
        res.status(404).json({ error: "project with ID doesn't exist"})
        : res.status(201).json(newProj)
    })
    .catch(err => {
      console.log(`this is error from insert`, err)
          res.status(500).json({ error: "There was an error while saving the project to the database"})
    })  
  }
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const del = { ...req.body, user_id: id}
  console.log(`DELETING`, del)
  projectData
    .remove(id)
    .then(rem => {
      !rem ?
      res.status(404).json({ message: "The project with the specified ID does not exist." })
        : res.status(200).json(rem)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed"  })
    })
})


// function validateProject(req, res, next) {
//   // validates all POST requests for new user (not new user posts)  
//   const { id } = req.params;
//   const project = { ...req.body, user_id: id };  
//   console.log(`validate project:`, project)

//   !project ? 
//     res.status(400).json({ message: "missing user data" }) 
//     : !project.name || !project.description
//     ? res.status(400).json({ message: "missing required fields" })
//     : next();
  
// }

module.exports = router;
