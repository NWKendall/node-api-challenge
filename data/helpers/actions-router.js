const express = require("express");
const actionData = require("./actionModel");

const router = express.Router();


router.get("/", (req, res) => {
  actionData
  .get()
    .then(act => {
      res.status(200).json(act)
    })
    .catch(err => {
      console.log(`this is get all prjects error`, err)
      res.status(500).json({ error: "SOMETHING WENT WRONG! WITH SERVER" })
    })
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const action = { ...req.body, id: id}
  console.log(`this is action`, action)


  !id || isNaN(parseInt(id)) ?
  res.status(400).json({ message: "invalid action id" }) :

  actionData
  .get(action.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(`this is get all actions error`, err)
      res.status(500).json({ error: "SOMETHING WENT WRONG! WITH SERVER" })
    })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const del = { ...req.body, id: id}
  console.log(`DELETING`, del)
  actionData
    .remove(id)
    .then(rem => {
      !rem ?
      res.status(404).json({ message: "The project with the specified ID does not exist." })
        : res.status(200).json(rem)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The project could not be removed"  })
    })
})






router.put("/:id", (req, res) => {
 
  const { id } = req.params;
  
  !id || isNaN(parseInt(id)) ?
    res.status(400).json({ message: "invalid post id" }) 
    : 

  actionData
    .update(id, req.body)
    .then(edit => {
      res.status(202).json(edit)
    })
    .catch(err => {
      console.log(err)
    res.status(500).json({ error: "The post information could not be modified." })
  })
  
})
 



module.exports = router;
