import config from 'config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/usersModel';

class CheckUser {
  static userExistsReg(req, res, next) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password,
      address: req.body.address,
      bio: req.body.bio,
      occupation: req.body.occupation,
      expertise: req.body.expertise,
      isMentor: false,
      admin: false,
    };
    const token = jwt.sign({
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      isMentor: user.isMentor,
      admin: user.admin,
    }, config.get('privateKey'));
    const userExists = users.some((oneUser) => oneUser.email === req.body.email);
    if (!userExists) {
      req.user = user;
      req.token = token;
      next();
    } else {
      return res.status(409).json({
        status: 409,
        error: 'That email is already in use',
      });
    }
  }

  static userExistsLogin(req, res, next) {
    const userExists = users.find((user) => user.email === req.body.email);
    if (userExists) {
      const comparePassword = bcrypt.compareSync(req.body.password, userExists.password);
      if (comparePassword) {
        const token = jwt.sign({
          id: userExists.id,
          firstName: userExists.firstName,
          email: userExists.email,
          isMentor: userExists.isMentor,
          admin: userExists.admin,
        }, config.get('privateKey'));
        req.token = token;
        req.user = userExists;
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: 'Invalid password',
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'User with that email not found',
      });
    }
  }
}

export default CheckUser;
