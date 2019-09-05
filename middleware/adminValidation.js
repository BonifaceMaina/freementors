import users from '../models/usersModel';
// import mentors from '../models/mentorsModel';

class AdminValidation {
  static checkUserToUpgrade(req, res, next) {
    const userToUpgrade = users.find((user) => user.id === req.params.userId);
    if (req.user.admin === true) {
      if (userToUpgrade) {
        if (userToUpgrade.isMentor === false) {
          userToUpgrade.isMentor = true;
          userToUpgrade.mentorId = userToUpgrade.id;
          req.user = userToUpgrade;
          next();
        } else {
          return res.status(400).json({ status: 400, message: 'User is already a mentor' });
        }
      } else {
        return res.status(400).json({ status: 404, message: 'User not found' });
      }
    } else {
      return res.status(403).json({ status: 403, message: 'Unauthorized access' });
    }
  }
}

export default AdminValidation;
