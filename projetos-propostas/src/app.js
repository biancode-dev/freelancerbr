const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const projectRouter = require('./routes/projectRoutes');
const app = express();
const port = 3000; 

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/projects', projectRouter);


app.get('/', (req, res) => {
    res.redirect('/projects');
});

app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Página não encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Algo deu errado no servidor!');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
