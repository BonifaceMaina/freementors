const config = require('config');
const jwt = require('jsonwebtoken');

class UserAuth{
    static isUser (req, res, next){
        const token = req.headers['token'];
        if(!token) return res.status(401).send('Unauthorized access. Please provide token');
    
        try{
            const decode = jwt.verify(token, config.get('privateKey'));
            req.user = decode;
                next();
        }catch (ex){
            res.status(400).send('Invalid token!');
        }
    };
}


module.exports = UserAuth;