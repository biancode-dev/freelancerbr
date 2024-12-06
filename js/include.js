function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(async (el) => {
        const file = el.getAttribute('data-include');
        if (file) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    el.innerHTML = html;
                } else {
                    console.error(`Erro ao carregar ${file}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Erro ao carregar ${file}:`, error);
            }
        }
    });
}

// Executa a função assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', includeHTML);
