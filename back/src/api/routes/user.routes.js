const express = require('express');
const {login, register, checkSession} = require('../controllers/users.controllers');
//const { isAuth } = require('../../middlewares/auth');
const userRoutes = express.Router();

userRoutes.post('/login', login)
userRoutes.post('/register', register);

//userRoutes.get('/checksession', isAuth, checkSession);

module.exports = userRoutes;