import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const usersFilePath = path.resolve(process.env.DATABASE_FILE);

const getUsers = async () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data).users || [];
};

const saveUsers = async (users) => {
    const data = { users };
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

const createUser = async (user) => {
    const users = await getUsers();
    user.password = await bcrypt.hash(user.password, 10);
    users.push(user);
    await saveUsers(users);
};

const findUserByUsername = async (username) => {
    const users = await getUsers();
    return users.find(user => user.username === username);
    console.log(users.username);
    
};

const findUserById = async (id) => {
    const users = await getUsers();
    return users.find(user => user.id === id);
};

const validatePassword = async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
};

export default { createUser, findUserByUsername, findUserById, validatePassword };
