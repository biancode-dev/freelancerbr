import path from 'path';
import express from 'express';
const router = express.Router();
const dataPath = (fileName) => path.join(path.resolve(), 'public', fileName);


// Rota para exibir a página de login (GET)
router.get('/login', (req, res) => {
    res.sendFile(dataPath('login.html'));
});

// Rota para exibir a página de registro (GET)
router.get('/register', (req, res) => {
    res.sendFile(dataPath('register.html'));
});

// Rota para exibir a página de confirmação (GET)
router.get('/confirmation', (req, res) => {
    res.sendFile(dataPath('confirmation.html'));
});

router.get('/profile', (req, res) => {
    const user = req.query;
    res.render('profile.ejs', { user } ); // Renderiza o arquivo EJS
});

export default router;
