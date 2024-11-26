const fs = require('fs').promises;
const path = require('path');
const projetosPath = path.join(__dirname, '..', 'data', 'projects.json');

//FUNÇÃO PARA LER O ARQUIVO
const readFile = async () => {
    try {
        const data = await fs.readFile(projetosPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao ler os dados do projeto');
    }
}

//FUNÇÃO PARA ESCREVER NO ARQUIVO
const writeData = async (data) => {
    try {
        await fs.writeFile(projetosPath, JSON.stringify(data, null, 2), 'utf-8');
        return (data);
    } catch (error) {
        console.log(error)
        throw new Error('Erro ao criar ou atualizar os dados do projeto');
    }
}

module.exports = {
    readFile,
    writeData
}


