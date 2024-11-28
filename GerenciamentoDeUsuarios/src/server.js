import express from 'express'; 
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import userRoutesApi from './routes/userRoutesApi.js';



dotenv.config();
const app = express();


// Configurar EJS como motor de templates e a pasta views corretamente
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Middleware para processar JSON e dados do formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração dos arquivos estáticos (CSS, JS)
app.use(express.static(path.join(path.resolve(), 'public')));

// Configuração do Cookie Parser para lidar com cookies
app.use(cookieParser());

// Configuração das rotas
app.use('/api/users', userRoutesApi);
app.use('/', userRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
