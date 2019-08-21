const config = require('config');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/users');

router.get('/', (req, res) => {
    res.send('signup');
});

router.post('/signup', (req, res) => {
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
        isMentor: false
    };
    const token = jwt.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        bio: user.bio,
        occupation: user.occupation,
        expertise: user.expertise
    }, config.get('privateKey'));
    const userExists = users.some(user => user.email === req.body.email);
    if(!userExists){
        users.push(user);
        res.status(201).json({
            status:201,
            message: 'User created successfully',
            data:{
                token: token,
                message: "User created successfully",
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
                bio: user.bio,
                occupation: user.occupation,
                expertise: user.expertise
            }
        });
    }else{
        return res.status(409).json({
            status: 409,
            error: "That email is already in use"
          });
    }
});

router.post('/signin', (req, res) => {
    res.json({
        
    });
});


const validateRequest = (request) =>{
    const schema ={
        firstName: Joi.string().min(3).required().trim(),
        lastName: Joi.string().min(3).required().trim(),
        email: Joi.string().email().min(3).required().trim(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        address: Joi.string().min(3).required().trim(),
        bio: Joi.string().min(3).required().trim(),
        occupation: Joi.string().min(3).required().trim(),
        expertise: Joi.string().min(3).required().trim()
    };
    return Joi.validate(request, schema);
}

module.exports = router;