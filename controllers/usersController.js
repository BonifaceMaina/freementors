const mentors = require('../models/mentors');

class UsersController {
    static viewAllMentors(req, res){
        res.status(200).json({ status: 200, data: mentors});
    }
}
module.exports =  UsersController;