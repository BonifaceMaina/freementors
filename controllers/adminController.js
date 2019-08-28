const users = require('../models/usersModel');
const mentors = require('../models/mentorsModel');


class AdminController{
    static upgradeUser(req, res){
        // const mentorSession = sessions.find(sessions => sessions.sessionId == req.params.sessionId);
        const userToUpgrade = users.find(user => user.id == req.params.userId);
        if(req.user.admin == true){
            if(userToUpgrade){
                if(userToUpgrade.isMentor == false){
                    userToUpgrade.isMentor = true;
                    mentors.push(userToUpgrade);
                    res.status(200).json({
                        status: 200,
                        message: 'User account changed to mentor',
                        data: userToUpgrade
                    });
                }else{
                    return res.status(400).json({ status: 400, message: 'User is already a mentor'});
                }
            }else{
                return res.status(400).json({ status: 404, message: 'User not found'});
            }
        }else{
            return res.status(403).json({ status: 403, message: 'Unauthorized access'});
        }
    }
}

module.exports = AdminController;