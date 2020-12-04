const ActionsDB = require('../actions/actions-model');
const ProjectsDB = require('../projects/projects-model');

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


const validateAction = async (req, res, next) => {
  console.log('validateAction', req.body);
  try {
    const projects = await ProjectsDB.get()    
    if(projects.filter(e => e.id === req.body.project_id).length > 0) {      
      if(!req.body.description || !req.body.notes) {
        res.status(400).json({ message: 'missing required description or notes field'})
      } else {
        next()
      }
    } else {
      res.status(400).json({message: `project with id ${req.body.project_id} does not exist`})
    }
  } catch (error) {
    res.status(400).json({ 
      message: 'Error validating project ID',
      error: error
    });
  }
}

module.exports = {
  validateID,
  validateAction
}