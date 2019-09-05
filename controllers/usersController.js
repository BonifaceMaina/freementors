import mentors from '../data/mentorsModel';
import sessions from '../data/sessionsModel';
import sessionReviews from '../data/sessionReviews';
import responseHelper from '../helpers/responseHelper';

class UsersController {
  // gets all mentors in the db
  static viewAllMentors(req, res) {
    return responseHelper.successRetrieval(200, mentors, res);
  }

  // viewing one mentor
  static viewOneMentor(req, res) {
    const oneMentor = mentors.find((mentor) => mentor.mentorId == req.params.mentorId);
    if (oneMentor) {
      return responseHelper.successRetrieval(200, oneMentor, res);
    }
    return responseHelper.errorMessage(404, 'Mentor with that ID not found', res);
  }

  // creating a new session (user)
  static createSession(req, res) {
    sessions.push(req.session);
      const sessionData =  {
        sessionId: req.session.sessionId,
        mentorId: req.session.mentorId,
        menteeId: req.session.menteeId,
        questions: req.session.questions,
        menteeEmail: req.session.menteeEmail,
        status: req.session.status,
      }
      return responseHelper.successRetrieval(201, sessionData, res)
  }

  // view all sessions (both mentor and user)
  static viewAllSessions(req, res) {
    return responseHelper.successRetrieval(200, req.mentorSessions, res)
  }

  // mentor to accept a session
  static acceptSession(req, res) {
    req.mentorSession.status = 'accepted';
    return responseHelper.successRetrieval(200, req.mentorSession, res)
  }

  // mentor to reject session
  static rejectSession(req, res) {
    req.mentorSession.status = 'rejected';
    return responseHelper.successRetrieval(200, req.mentorSession, res)
  }

  // create a session review
  static createSessionReview(req, res) {
    sessionReviews.push(req.review);
    const  sessionReview = {
        sessionId: req.sessionToReview.sessionId,
        mentorId: req.sessionToReview.mentorId,
        menteeId: req.user.id,
        score: req.review.score,
        menteeFullName: req.user.firstName,
        remark: req.review.remark
      }
    return responseHelper.successRetrieval(200, sessionReview, res)
  }


  // admin to delete given review
  static adminDeleteReview(req, res) {
    sessionReviews.splice(sessionReviews.indexOf(req.reviewToDelete), 1);
    return responseHelper.successMessage(200, 'Review successfully deleted', res)
  }
}
export default UsersController;
