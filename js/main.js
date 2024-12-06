import { fetchProjects, fetchFreelancers } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadFreelancers();
});

async function loadProjects() {
    try {
        const projects = await fetchProjects();
        console.log("projects", projects);
        const projectsContainer = document.getElementById('projects-container');
        const projectTemplate = document.getElementById('project-template');

        projects.forEach(project => {
            const projectElement = projectTemplate.content.cloneNode(true);
            projectElement.querySelector('.project-title').textContent = project.title;
            projectElement.querySelector('.project-description').textContent = project.description;
            projectElement.querySelector('.project-client').textContent = project.customer_name;
            projectsContainer.appendChild(projectElement);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function loadFreelancers() {
    try {
        const freelancers = await fetchFreelancers();
        const freelancersContainer = document.getElementById('freelancers-container');
        const freelancerTemplate = document.getElementById('freelancer-template');

        freelancers.forEach(freelancer => {
            const freelancerElement = freelancerTemplate.content.cloneNode(true);
            freelancerElement.querySelector('.freelancer-name').textContent = freelancer.name;
            freelancerElement.querySelector('.freelancer-skill').textContent = freelancer.skill;
            freelancersContainer.appendChild(freelancerElement);
        });
    } catch (error) {
        console.error('Error loading freelancers:', error);
    }
}
