const { readFile, writeData } = require('../models/projectModels'); // Funções para manipular dados


async function getProjects() {
    try {
        return await readFile();
    } catch (error) {
        throw new Error('Erro ao acessar os dados dos projetos');
    }
}


exports.getAllProjects = async (req, res) => {
    try {
        const projects = await getProjects();
        res.render('projects/index', { projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.renderCreateProject = (req, res) => {
    res.render('projects/create');
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await getProjects();
        const project = projects.find(p => p.id === parseInt(id));
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        project.value = parseFloat(project.value);
        res.render('projects/show', { project });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar os dados do projeto' });
    }
};

exports.renderEditProject = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await getProjects();
        const project = projects.find(p => p.id === parseInt(id));
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        project.value = parseFloat(project.value);
        res.render('projects/edit', { project });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar os dados do projeto' });
    }
};


exports.createProject = async (req, res) => {
    const { title, description, value } = req.body;
    if (!title || !description || !value) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }
    try {
        const projects = await getProjects();
        const newProject = {
            id: projects.length ? projects[projects.length - 1].id + 1 : 1,
            title: title.trim(),
            description: description.trim(),
            value: parseFloat(value),
        };
        await writeData([...projects, newProject]);
        res.redirect('/projects');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o projeto.' });
    }
};


exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, value } = req.body;
    try {
        const projects = await getProjects();
        const project = projects.find(p => p.id === parseInt(id));
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }


        project.title = title || project.title;
        project.description = description || project.description;
        project.value = parseFloat(value) || project.value;

        await writeData(projects);
        res.redirect(`/projects/${project.id}`);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o projeto.' });
    }
};


exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await getProjects();
        const updatedProjects = projects.filter(project => project.id !== parseInt(id));
        if (projects.length === updatedProjects.length) {
            return res.status(404).json({ error: 'Projeto não encontrado.' });
        }
        await writeData(updatedProjects);
        res.status(200).json({ message: 'Projeto excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o projeto.' });
    }
};
