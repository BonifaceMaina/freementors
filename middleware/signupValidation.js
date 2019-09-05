const Joi = require('joi');
export default(req, res, next) => {
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
    const { error } = validateRequest(req.body);
		if(error){
			res.status(400).send(error.details[0].message);
			return;
        }
    next();
}