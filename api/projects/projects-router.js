// Write your "projects" router here!
const express = require('express');
const ProjectsDB = require('./projects-model');
const { validateID } = require('../middleware/projects-middleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {    
    const projects = await ProjectsDB.get()
    res.status(200).json(projects)
  } catch (error) {
      next(error)
  }
})

router.get('/:id', validateID, async (req, res, next) => {
  res.status(200).json(req.project)
})

router.post('/', (req, res, next) => {
  try {
    const newProject = ProjectsDB.insert(req.body)    
    res.status(201).json(newProject)
  } catch (error) {    
    next(error)
  }
})

router.put('/:id', validateID, async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;   
    if (Object.keys(changes).length > 0){
      const editProject = await ProjectsDB.update(id,changes)      
      console.log('projectPUT',editProject);
      
      res.status(200).json(editProject)
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
    const delProject = await ProjectsDB.remove(id);
    res.status(200).json({ message: `The project with id ${id} has been deleted`, delete:delProject})
  } catch (error) {
    next(error)
  }
})

router.get('/:id/actions', validateID, async (req, res, next) => {
  try {
    const { id } = req.params;
    const actions = await ProjectsDB.getProjectActions(id);
    res.status(200).json(actions);
  } catch (error) {
    next(error);
  }
})

router.use((err, _, res) => {
  res.status(500).json({
    message: 'Something went wrong on the server',
    error: err.message,
  });
});

module.exports = router;