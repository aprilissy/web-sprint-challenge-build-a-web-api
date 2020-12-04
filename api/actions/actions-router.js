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

router.put('/:id', (req, res, next) => {

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