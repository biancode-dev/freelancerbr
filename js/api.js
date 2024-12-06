const API_BASE_URL = 'http://localhost:3000'; 

export async function fetchProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    console.log("fetchProjects", response);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
}

export async function fetchFreelancers() {
    const response = await fetch(`${API_BASE_URL}/freelancers`);
    if (!response.ok) throw new Error('Failed to fetch freelancers');
    return response.json();
}

export async function postProject(data) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to post project');
    return response.json();
}
