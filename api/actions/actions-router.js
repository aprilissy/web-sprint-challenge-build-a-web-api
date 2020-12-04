// Write your "actions" router here!
const express = require('express');
const ActionsDB = require('./actions-model');
const { validateID, validateAction } = require('../middleware/actions-middleware');
const router = express.Router();


router.get('/', async (_, res, next) => {  
  try {    
    const actions = await ActionsDB.get()
    res.status(200).json(actions)
  } catch (error) {
      next(error)
  }
});

router.get('/:id', validateID, async(req, res) => {
  res.status(200).json(req.action)
})

router.post('/', validateAction, async (req, res, next) => {
  try {
    const newAction = await ActionsDB.insert(req.body)    
    res.status(201).json(newAction)
  } catch (error) {    
    next(error)
  }
});

router.put('/:id', validateID, async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    if (Object.keys(changes).length > 0){
      const editAction = await ActionsDB.update(id,changes)
      res.status(200).json(editAction)
    } else {
      res.status(400).json({ message: 'missing data'})
    }
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', validateID, async (req, res, next) => {
  try {
    const { id } = req.params; 
    const delAction = await ActionsDB.remove(id);
    res.status(200).json({ message: `The action with id ${id} has been deleted`, delete:delAction})
  } catch (error) {
    next(error)
  }
})

router.use((err, _, res) => {
  res.status(500).json({
    message: 'Something went wrong on the server',
    error: err.message,
  });
});


module.exports = router;