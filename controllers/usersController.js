const mentors = require('../models/mentors');

// gets all mentors in the db
class UsersController {
    static viewAllMentors(req, res){
        return res.status(200).json({ status: 200, data: mentors});
    }

    static viewOneMentor(req, res){
        const oneMentor = mentors.find(mentor => mentor.mentorId == req.params.mentorId);
        if (oneMentor){
            return res.status(200).json({ status: 200, data: oneMentor});
        }else{
            return res.status(404).json(({status: 404, message: 'Mentor with that ID not found'}));
        }
    }
}
module.exports =  UsersController;