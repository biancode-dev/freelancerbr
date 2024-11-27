const express = require('express');
const path = require('path');
const { readTransactions, addTransaction, readAvaliacoes, addAvaliacao } = require('./scripts/handleData');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos e processar JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota para obter transações
app.get('/api/transactions', (req, res) => {
    const transactions = readTransactions();
    res.json(transactions);
});

// Rota para adicionar uma nova transação
app.post('/api/transactions', (req, res) => {
    const newTransaction = req.body;
    addTransaction(newTransaction);
    res.status(201).json({ message: 'Transação adicionada com sucesso!' });
});

// Rota para obter avaliações
app.get('/api/avaliacoes', (req, res) => {
    const avaliacoes = readAvaliacoes();
    res.json(avaliacoes);
});

// Rota para adicionar uma nova avaliação
app.post('/api/avaliacao', (req, res) => {
    const { nome, nota, comentario } = req.body;

    // Validação básica dos campos
    if (!nome || !nota || !comentario) {
        return res.status(400).json({ message: 'Os campos nome, nota e comentário são obrigatórios!' });
    }

    addAvaliacao({ nome, nota, comentario });
    res.status(201).json({ message: 'Avaliação salva com sucesso!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
