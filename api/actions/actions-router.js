// Write your "actions" router here!
const express = require('express');
const ActionsDB = require('./actions-model');
const router = express.Router();


router.get('/', async (_, res, next) => {
  console.log('res',res);
  
  try {    
    const users = await ActionsDB.get()
    console.log('users: ', users);
    
    res.status(200).json(users)
  } catch (error) {
      next(error)
  }
});


// router.get('/:id', (req, res, next) => {

// })
// router.post('/', (req, res, next) => {

// })
// router.put('/:id', (req, res, next) => {

// })
// router.delete('/:id', (req, res, next) => {

// })



router.use((err, _, res) => {
  res.status(500).json({
    message: 'Something went wrong on the server',
    error: err.message,
  });
});


module.exports = router;