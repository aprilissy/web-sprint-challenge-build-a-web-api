const ProjectsDB = require('../projects/projects-model');

const validateID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await ProjectsDB.get(id);
    if (!project) {
      res.status(404).json({ message: `project with id ${id} not found`})
    } else {
      req.project = project;
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