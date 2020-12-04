const ActionsDB = require('../actions/actions-model');

const validateID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await ActionsDB.get(id);
    if (!action) {
      res.status(404).json({ message: `Action with id ${id} not found`})
    } else {
      req.action = action;
      next();
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error validating ID',
      error: error
    });
  }
};

// function validateAction(req, res, next) {
//   console.log('validateAction', req.body);
  
//   if(!req.body) {
//     res.status(400).json({ message: 'missing action data'})
//   } else if (!req.body.description || ! req.body.notes) {
//     res.status(400).json({ message: 'missing required description or notes field'})
//   } else {
//     next()
//   }
// }

function validateAction(req, res, next) {
  console.log('validateAction', req.body);
  
  if(!req.body) {
    res.status(400).json({ message: 'missing action data'})
  } else if (!req.body.description || ! req.body.notes) {
    res.status(400).json({ message: 'missing required description or notes field'})
  } else {
    next()
  }
}

module.exports = {
  validateID,
  validateAction
}