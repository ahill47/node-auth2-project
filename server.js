const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const helmet = require('helmet')

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');
const cookieParser = require('cookie-parser');


const server = express();
 // to get access to env file


server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use('/auth', authRouter);
server.use('/users', userRouter);

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome Alexis",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;