import responseHelper from '../helpers/responseHelper';
import mentors from '../data/mentorsModel';

class AdminController {
  // upgrade user to mentor status
  static upgradeUser(req, res) {
    mentors.push(req.user);
    const data = req.user;
    responseHelper.successMessage(200, 'User account changed to mentor', data, res);
  }
}

export default AdminController;
