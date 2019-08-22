const mentors = require('../models/mentors');

// gets all mentors in the db
class UsersController {
    static viewAllMentors(req, res){
        res.status(200).json({ status: 200, data: mentors});
    }
}
module.exports =  UsersController;