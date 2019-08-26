const config = require('config');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/usersModel');
const mentors = require('../models/mentorsModel');


class authController{
    // register new user
    static registerUser(req, res){
        const { error } = validateRequest(req.body);
	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}
	const password = bcrypt.hashSync(req.body.password, 10);

	const user = {
		id: users.length + 1, 
		firstName: req.body.firstName,
		lastName: req.body.lastName, 
		email:req.body.email,
		password:password,
		address: req.body.address,
		bio:req.body.bio,
		occupation: req.body.occupation,
		expertise:req.body.expertise,
		isMentor: false,
		admin:false
	};
	const token = jwt.sign({
		id: user.id,
		firstName: user.firstName,
		email: user.email,
		isMentor: user.isMentor,
		admin:user.admin
	}, config.get('privateKey'));
	const userExists = users.some(user => user.email === req.body.email);
	if(!userExists){
		users.push(user);
		res.status(201).json({
			status:201,
			message: 'User created successfully',
			data:{
				token: token,
				message: 'User created successfully',
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
                address: user.address,
                password: password,
				bio: user.bio,
				occupation: user.occupation,
				expertise: user.expertise
			}
		});
	}else{
		return res.status(409).json({
			status: 409,
			error: 'That email is already in use'
		});
	}

    }

// signin user
    static signinUser(req,res){

        const { error } = validateLogin(req.body);
	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}
	const userExists = users.find(user => user.email === req.body.email);
	const mentorExists = mentors.find(mentor => mentor.email === req.body.email);

	// check if user is in user database
	if(userExists){
		const comparePassword = bcrypt.compareSync(req.body.password, userExists.password);
		if(comparePassword){
			const token = jwt.sign({
				id: userExists.id,
				firstName: userExists.firstName,
				email: userExists.email,
				isMentor: userExists.isMentor,
				admin: userExists.admin
			}, config.get('privateKey'));
			res.status(200).json({
				status: 200, 
				message: 'User is successfully logged in', 
				data:{
					token: token, 
					email: userExists.email
				}
			});
		}else{
			return res.status(401).json({
				status: 401, 
				message: 'Invalid password'
			});
		}
	}else if(mentorExists){
	// check if mentor is in mentor database
		const comparePassword = bcrypt.compareSync(req.body.password, mentorExists.password);
		if(comparePassword){
			const token = jwt.sign({
				mentorId: mentorExists.mentorId,
				firstName: mentorExists.firstName,
				email: mentorExists.email,
				isMentor: mentorExists.isMentor,
				admin: mentorExists.admin
			}, config.get('privateKey'));
			res.status(200).json({
				status: 200, 
				message: 'User is successfully logged in', 
				data:{
					token: token, 
					email: mentorExists.email
				}
			});
		}else{
			return res.status(401).json({
				status: 401, 
				message: 'Invalid password'
			});
		}

	}
	else{
		return res.status(401).json({
			status: 401,
			message: 'User with that email not found'
		});
	}

    }
}

// validate registration request
const validateRequest = (request) =>{
	const schema ={
		firstName: Joi.string().min(3).required().trim(),
		lastName: Joi.string().min(3).required().trim(),
		email: Joi.string().email().min(3).required().trim(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,300}$/),
		address: Joi.string().min(3).required().trim(),
		bio: Joi.string().min(3).required().trim(),
		occupation: Joi.string().min(3).required().trim(),
		expertise: Joi.string().min(3).required().trim()
	};
	return Joi.validate(request, schema);
};

// validate login request
const validateLogin = (request) =>{
	const schema ={
		email: Joi.string().email().min(3).required().trim(),
		password: Joi.string().required()
	};
	return Joi.validate(request, schema);
};

module.exports = authController;