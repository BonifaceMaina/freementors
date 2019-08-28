const mentors = require('../models/mentorsModel');
const sessions = require('../models/sessionsModel');

const Joi = require('joi');

class UsersController {
    // gets all mentors in the db
    
    static viewAllMentors(req, res){
        return res.status(200).json({ status: 200, data: mentors});
    }

    // viewing one mentor

    static viewOneMentor(req, res){
        const oneMentor = mentors.find(mentor => mentor.mentorId == req.params.mentorId);
        if (oneMentor){
            return res.status(200).json({ status: 200, data: oneMentor});
        }else{
            return res.status(404).json(({status: 404, message: 'Mentor with that ID not found'}));
        }
    }

    // creating a new session (user)

    static createSession(req, res){
        const validateCreateSession = (request) => {
            const schema ={
                mentorId: Joi.number(),
                questions: Joi.string().required().min(3).trim()
            };
            return Joi.validate(request, schema);
        };

        const { error } = validateCreateSession(req.body);

        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
        // check if mentor with the ID exists
        const mentor = mentors.some(mentors => mentors.mentorId === req.body.mentorId);
        if(mentor){
            const session = {
                sessionId: sessions.length +1,
                mentorId: req.body.mentorId,
                menteeId: req.user.id,
                questions: req.body.questions,
                menteeEmail: req.user.email,
                status: 'pending'
            }
            sessions.push(session);
            res.status(201).json({
                status: 201,
                data: {
                    sessionId:session.sessionId,
                    mentorId: session.mentorId,
                    menteeId: session.menteeId,
                    questions: session.questions,
                    menteeEmail: session.menteeEmail,
                    status: session.status
                }
            });
        }else{
            return res.status(404).json({ status: 404, message: 'No mentor with that ID'});
        }
    }

    // view all sessions (both mentor and user)

    static viewAllSessions(req, res){
        if(req.user.isMentor == true){
            const mentorSessions = sessions.filter(c => c.mentorId == req.user.mentorId);
            return res.status(200).json({ status: 200, data: mentorSessions});
        }
        else if(req.user.isMentor == false){
            return res.status(200).json({ status: 200, data: 'mentorSessions'});
        }
        else{
            return res.status(403).json({ status: 403, message:'Unauthorized access.'});
        }
    }

    // mentor to accept a session

    static acceptSession(req, res){
        if(req.user.isMentor == true){
            const mentorSession = sessions.find(sessions => sessions.sessionId == req.params.sessionId);
            if(mentorSession){
                if(req.user.id == mentorSession.mentorId){
                    mentorSession.status = 'accepted';
                    return res.status(200).json({ status: 200, data: mentorSession});
                }else{
                    return res.status(403).json({ status: 403, message:'Unauthorized access. You can only view your sessions'});
                }
            }else{
                return res.status(404).json({ status: 404, message:'You do not have a session with that ID'});
            }
        }else{
            return res.status(403).json({ status: 403, message:'Unauthorized access.'});
        }
    }
}
module.exports =  UsersController;