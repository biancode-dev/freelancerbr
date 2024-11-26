import express from 'express';
import fs from 'fs';
import path from 'path';
import projetos from './projetos.js'; 

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`rodando na porta ${port}`));
const projetosPath = path.join(__dirname, 'data', 'projetos.json');
fs.writeFileSync(projetosPath, JSON.stringify(projetos));