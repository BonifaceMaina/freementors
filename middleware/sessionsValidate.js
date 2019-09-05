import Joi from 'joi';
import mentors from '../data/mentorsModel';
import sessions from '../data/sessionsModel';
import sessionReviews from '../data/sessionReviews';
import responseHelper from '../helpers/responseHelper';


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
      return responseHelper.errorMessage(400, error.details[0].message, res);
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
      return responseHelper.errorMessage(404, 'No mentor with that ID', res);
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
    } else {
      return responseHelper.errorMessage(403, 'Unauthorized access.', res);
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
          return responseHelper.errorMessage(403, 'Unauthorized access. You can only view your sessions', res);
        }
      } else {
        return responseHelper.errorMessage(404, 'You do not have a session with that ID', res);
      }
    } else {
      return responseHelper.errorMessage(403, 'Unauthorized access', res);
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
          return responseHelper.errorMessage(403, 'Unauthorized access. You can only reject your sessions', res);

        }
      } else {
        return responseHelper.errorMessage(404, 'You do not have a session with that ID', res);
              }
    } else {
      return responseHelper.errorMessage(403, 'Unauthorized access.', res);      
    }
  }

  static createSessionReview(req, res, next) {
    if (req.user.isMentor === true) {
      return responseHelper.errorMessage(403, 'Unauthorized access. Only mentees can create reviews', res);
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
          return responseHelper.errorMessage(403, 'Session has not been accepted yet', res);
        }
      } else {
        return responseHelper.errorMessage(403, 'Unauthorized access. You can only review your sessions', res);
      }
    } else {
      return responseHelper.errorMessage(403, 'No session with that ID', res);
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
        return responseHelper.errorMessage(404, 'Review with that ID not found', res);
      }
    } else {
      return responseHelper.errorMessage(403, 'Unauthorized access. You are not an admin', res);
    }
  }
}

export default SessionsValidate;
