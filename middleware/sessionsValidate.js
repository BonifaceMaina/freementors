import Joi from 'joi';
import mentors from '../models/mentorsModel';
import sessions from '../models/sessionsModel';
import sessionReviews from '../models/sessionReviews';

class SessionsValidate {
  static createSession(req, res, next) {
    const validateCreateSession = (request) => {
      const schema = {
        mentorId: Joi.number(),
        questions: Joi.string().required().min(3).trim(),
      };
      return Joi.validate(request, schema);
    };

    const { error } = validateCreateSession(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    // check if mentor with the ID exists
    const mentor = mentors.some((oneMentor) => oneMentor.mentorId === req.body.mentorId);
    if (mentor) {
      const session = {
        sessionId: sessions.length + 1,
        mentorId: req.body.mentorId,
        menteeId: req.user.id,
        questions: req.body.questions,
        menteeEmail: req.user.email,
        status: 'pending',
      };
      req.session = session;
      next();
    } else {
      return res.status(404).json({ status: 404, message: 'No mentor with that ID' });
    }
  }

  static viewAllSessions(req, res, next) {
    if (req.user.isMentor === true) {
      const mentorSessions = sessions.filter((c) => c.mentorId === req.user.mentorId);
      req.mentorSessions = mentorSessions;
      next();
    } else if (req.user.isMentor === false) {
      const mentorSessions = sessions.filter((c) => c.menteeId === req.user.id);
      req.mentorSessions = mentorSessions;
      next();
      // return res.status(200).json({ status: 200, data: mentorSessions});
    } else {
      return res.status(403).json({ status: 403, message: 'Unauthorized access.' });
    }
  }

  static acceptSession(req, res, next) {
    if (req.user.isMentor === true) {
      const mentorSession = sessions.find((oneSession) => oneSession.sessionId == req.params.sessionId);
      if (mentorSession) {
        if (req.user.id === mentorSession.mentorId) {
          req.mentorSession = mentorSession;
          next();
        } else {
          return res.status(403).json({ status: 403, message: 'Unauthorized access. You can only view your sessions' });
        }
      } else {
        return res.status(404).json({ status: 404, message: 'You do not have a session with that ID' });
      }
    } else {
      return res.status(403).json({ status: 403, message: 'Unauthorized access.' });
    }
  }

  static rejectSession(req, res, next) {
    if (req.user.isMentor === true) {
      const mentorSession = sessions.find((sessions) => sessions.sessionId == req.params.sessionId);
      if (mentorSession) {
        if (req.user.id === mentorSession.mentorId) {
          req.mentorSession = mentorSession;
          next();
        } else {
          return res.status(403).json({ status: 403, message: 'Unauthorized access. You can only view your sessions' });
        }
      } else {
        return res.status(404).json({ status: 404, message: 'You do not have a session with that ID' });
      }
    } else {
      return res.status(403).json({ status: 403, message: 'Unauthorized access.' });
    }
  }

  static createSessionReview(req, res, next) {
    if (req.user.isMentor === true) {
      return res.status(403).json({ status: 403, message: 'Unauthorized access. Only mentees can create reviews' });
    }
    // check if the session exists
    const sessionToReview = sessions.find((oneSession) => oneSession.sessionId == req.params.sessionId);
    if (sessionToReview) {
      if (sessionToReview.menteeId === req.user.id) {
        if (sessionToReview.status === 'accepted') {
          const review = {
            score: req.body.score,
            remark: req.body.remark,
          };
          req.review = review;
          req.sessionToReview = sessionToReview;
          next();
        } else {
          return res.status(403).json({ status: 403, message: 'Session has not been accepted yet' });
        }
      } else {
        return res.status(403).json({ status: 403, message: 'Unauthorized access. You can only review your sessions' });
      }
    } else {
      return res.status(403).json({ status: 403, message: 'No session with that ID' });
    }
  }

  static adminDeleteReview(req, res, next) {
    if (req.user.admin === true) {
      const reviewToDelete = sessionReviews
      .find((sessionReview) => sessionReview.sessionId == req.params.sessionId);
      if (reviewToDelete) {
        req.reviewToDelete = reviewToDelete;
        next();
      } else {
        return res.status(404).json({ status: 404, message: 'Review with that ID not found' });
      }
    } else {
      return res.status(403).json({ status: 403, message: 'Unauthorized access. You are not an admin' });
    }
  }
}

export default SessionsValidate;
