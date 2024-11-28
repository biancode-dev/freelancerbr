import express from 'express';
import { registerUser, loginUser, viewProfile } from '../controllers/userController.js';
const router = express.Router();


// Rota de registro (POST)
router.post('/register', registerUser);

// Rota de login (POST)
router.post('/login', loginUser);

// Rota para exibir o perfil do usuário (GET)
router.get('/profile', viewProfile);

export default router;
