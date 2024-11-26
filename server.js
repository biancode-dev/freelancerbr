const express = require('express');
const {  getAllProjects, getProjectById, createProject, deleteProject, updateProject } = require('./src/controllers/projectController');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/projects', getAllProjects);

app.get('/projects/:id', getProjectById);

app.post('/projects', createProject);

app.put('/projects/:id', updateProject);

app.delete('/projects/:id', deleteProject);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
