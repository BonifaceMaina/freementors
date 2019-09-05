
class AdminController {
  // upgrade user to mentor status
  static upgradeUser(req, res) {
    mentors.push(req.user);
    res.status(200).json({
      status: 200,
      message: 'User account changed to mentor',
      data: req.user,
    });
  }
}

export default AdminController;
