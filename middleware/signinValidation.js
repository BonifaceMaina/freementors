import Joi from 'joi';
export default (req, res, next) => {
    const validateLogin = (request) =>{
        const schema ={
            email: Joi.string().email().min(3).required().trim(),
            password: Joi.string().required()
        };
        return Joi.validate(request, schema);
    };
    const { error } = validateLogin(req.body);
		if(error){
			res.status(400).send(error.details[0].message);
			return;
        }
    next();    
}