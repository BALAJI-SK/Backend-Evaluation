/* eslint-disable no-unused-vars */
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const authRequest = require('../utils/authEndPoint');
const HttpError = require('../utils/errors/httpError');

const authValidator = async (req, res, next) => {
	const token = req.headers.token;
	if (!token) {
		res.status(400).json('Token is required');
	}
	try {
		const data  =await authRequest(token);
		if(data.message === 'Token is valid'){
			next();}
	}catch(e){
		res.status(400).json('Token is invaild');
	}
	
};
module.exports =  authValidator;