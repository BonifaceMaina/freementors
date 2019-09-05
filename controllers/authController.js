import users from '../models/usersModel';


class authController {
  // register new user
  static registerUser(req, res) {
    users.push(req.user);
    res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
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
      },
    });
  }

  // signin user
  static signinUser(req, res) {
    res.status(200).json({
      status: 200,
      message: 'User is successfully logged in',
      data: {
        token: req.token,
        email: req.user.email,
      },
    });
  }
}
export default authController;
