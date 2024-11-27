const fs = require('fs');
const path = require('path');

// Caminhos para os arquivos
const transactionsFilePath = path.join(__dirname, '../transactions.json');
const avaliacoesFilePath = path.join(__dirname, '../avaliacoes.json');

// Funções para manipular transações
function readTransactions() {
    try {
        const data = fs.readFileSync(transactionsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler transações:', err);
        return [];
    }
}

function addTransaction(newTransaction) {
    const transactions = readTransactions();
    transactions.push(newTransaction);

    try {
        fs.writeFileSync(transactionsFilePath, JSON.stringify(transactions, null, 2), 'utf8');
        console.log('Transação salva com sucesso!');
    } catch (err) {
        console.error('Erro ao salvar transação:', err);
    }
}

// Funções para manipular avaliações
function readAvaliacoes() {
    try {
        const data = fs.readFileSync(avaliacoesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler avaliações:', err);
        return [];
    }
}

function addAvaliacao(newAvaliacao) {
    const avaliacoes = readAvaliacoes();
    avaliacoes.push(newAvaliacao);

    try {
        fs.writeFileSync(avaliacoesFilePath, JSON.stringify(avaliacoes, null, 2), 'utf8');
        console.log('Avaliação salva com sucesso!');
    } catch (err) {
        console.error('Erro ao salvar avaliação:', err);
    }
}

module.exports = { readTransactions, addTransaction, readAvaliacoes, addAvaliacao };
