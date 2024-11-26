const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// ROTA PRINCIPAL
router.get('/', projectController.getAllProjects);


// ROTA PARA CRIAR UM NOVO PROJETO
router.get('/create', projectController.renderCreateProject);

router.post('/create', projectController.createProject);

// ROTA PARA OBTER UM PROJETO PELO ID
router.get('/:id/edit', projectController.renderEditProject);

// Rota para editar um projeto
router.post('/:id/edit', projectController.updateProject);

// Rota para exibir os detalhes de um projeto
router.get('/:id', projectController.getProjectById); 


// ROTA PARA ATUALIZAR UM PROJETO
router.put('/:id', projectController.updateProject);

// router.delete('/projects/:id', projectController.deleteProject);
router.post('/delete/:id', projectController.deleteProject);


module.exports = router;
