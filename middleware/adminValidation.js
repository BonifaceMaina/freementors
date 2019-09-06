import users from '../data/usersModel';
import responseHelper from '../helpers/responseHelper';

// import mentors from '../models/mentorsModel';

class AdminValidation {
  static checkUserToUpgrade(req, res, next) {
    const userToUpgrade = users.find((user) => user.id == req.params.userId);
    if (req.user.admin === true) {
      if (userToUpgrade) {
        if (userToUpgrade.isMentor === false) {
          userToUpgrade.isMentor = true;
          userToUpgrade.mentorId = userToUpgrade.id;
          req.user = userToUpgrade;
          next();
        } else {
          return responseHelper.errorMessage(400, 'User is already a mentor', res)
        }
      } else {
        return responseHelper.errorMessage(400, 'User not found', res)
      }
    } else {
      return responseHelper.errorMessage(403, 'Unauthorized access', res)
    }
  }
}

export default AdminValidation;
