import users from '../data/usersModel';
import responseHelper from '../helpers/responseHelper';

class authController {
  // register new user
  static registerUser(req, res) {
    users.push(req.user);
    const data = {
      token: req.token,
      message: 'User created successfully',
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      address: req.user.address,
      password: req.password,
      bio: req.user.bio,
      occupation: req.user.occupation,
      expertise: req.user.expertise,
      isMentor: false,
      admin: false,
    };
    return responseHelper.successMessage(201, 'User created successfully', data, res);
  }

  // signin user
  static signinUser(req, res) {
    const data = {
      token: req.token,
      email: req.user.email,
    };
    return responseHelper.successMessage(200, 'User is successfully logged in', data, res);
  }
}
export default authController;
