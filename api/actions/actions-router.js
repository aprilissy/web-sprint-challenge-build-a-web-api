// Write your "actions" router here!
const express = require('express');
const ActionsDB = require('./actions-model');
const { validateID, validateAction } = require('../middleware/actions-middleware');
const router = express.Router();


router.get('/', async (_, res, next) => {  
  try {    
    const users = await ActionsDB.get()
    res.status(200).json(users)
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
    console.log('body changes,',changes);
    const editAction = await ActionsDB.update(id,changes)
    res.status(200).json(editAction)
  } catch (error) {
    next(error);
  }
})

// router.delete('/:id', (req, res, next) => {

// })



router.use((err, _, res) => {
  res.status(500).json({
    message: 'Something went wrong on the server',
    error: err.message,
  });
});


module.exports = router;