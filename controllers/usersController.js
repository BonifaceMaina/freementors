import mentors from '../models/mentorsModel';
import sessions from '../models/sessionsModel';
import sessionReviews from '../models/sessionReviews';

class UsersController {
  // gets all mentors in the db
  static viewAllMentors(req, res) {
    return res.status(200).json({ status: 200, data: mentors });
  }

  // viewing one mentor
  static viewOneMentor(req, res) {
    const oneMentor = mentors.find((mentor) => mentor.mentorId == req.params.mentorId);
    if (oneMentor) {
      return res.status(200).json({ status: 200, data: oneMentor });
    }
    return res.status(404).json(({ status: 404, message: 'Mentor with that ID not found' }));
  }

  // creating a new session (user)
  static createSession(req, res) {
    sessions.push(req.session);
    res.status(201).json({
      status: 201,
      data: {
        sessionId: req.session.sessionId,
        mentorId: req.session.mentorId,
        menteeId: req.session.menteeId,
        questions: req.session.questions,
        menteeEmail: req.session.menteeEmail,
        status: req.session.status,
      },
    });
  }

  // view all sessions (both mentor and user)
  static viewAllSessions(req, res) {
    res.status(200).json({ status: 200, data: req.mentorSessions });
  }

  // mentor to accept a session
  static acceptSession(req, res) {
    req.mentorSession.status = 'accepted';
    return res.status(200).json({ status: 200, data: req.mentorSession });
  }

  // mentor to reject session
  static rejectSession(req, res) {
    req.mentorSession.status = 'rejected';
    return res.status(200).json({ status: 200, data: req.mentorSession });
  }

  // create a session review
  static createSessionReview(req, res) {
    sessionReviews.push(req.review);
    return res.status(200).json({
      status: 200,
      data: {
        sessionId: req.sessionToReview.sessionId,
        mentorId: req.sessionToReview.mentorId,
        menteeId: req.user.id,
        score: req.review.score,
        menteeFullName: req.user.firstName,
        remark: req.review.remark,
      },
    });
  }


  // admin to delete given review
  static adminDeleteReview(req, res) {
    sessionReviews.splice(sessionReviews.indexOf(req.reviewToDelete), 1);
    return res.status(200).json({ status: 200, message: 'Review successfully deleted' });
  }
}
export default UsersController;
