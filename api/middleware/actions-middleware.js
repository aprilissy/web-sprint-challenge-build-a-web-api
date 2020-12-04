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

module.exports = {
  validateID
}