import chai from 'chai';
const expect = chai.expect;
import app from '../index';

describe('check session routes', function(){

	it('creates a new session', function(done){
		chai.request(app)
			.post('/api/v1/sessions/')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDAwMjMwfQ._IaMtX-xuzuygTav0D7MNtQ9rsQVZwOcM8wVQWu9ygE')
			.send({
				mentorId: 1,
				questions: 'how do I learn programming?'
			})
			.end((error,response) => {
				expect(response.statusCode).to.equal(201);
				if(error) done(error);
				done();        
			});
	});

	it('returns all sessions for a user', function(done){
		chai.request(app)
			.get('/api/v1/sessions')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyQGdtYWlsLmNvbSIsImlzTWVudG9yIjpmYWxzZSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjY4MjIxNDh9.6e5fHs1YoJc9nArP3fz0s9-tisIkjYt7BhpzXk4HllI')
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('returns all sessions for a mentor', function(done){
		chai.request(app)
			.get('/api/v1/sessions/')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW50b3JJZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNiQGdtYWlsLmNvbSIsImlzTWVudG9yIjp0cnVlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjY4MTMwN30.-JhfbuogS8jeAeoBxCm5hFHF7gngCPI_RmdKVaiw9-8')
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	// mentor accept session tests
	it('changes status of a session to accepted', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/1/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should only allow mentor to change status of session', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/1/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
			.end((error,response) => {
				expect(response.statusCode).to.equal(400);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should not change another mentor\'s session', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/2/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
			.end((error,response) => {
				expect(response.statusCode).to.equal(403);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should not accept a non-existent session', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/456/accept')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW50b3JJZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNiQGdtYWlsLmNvbSIsImlzTWVudG9yIjp0cnVlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjY4MTMwN30.-JhfbuogS8jeAeoBxCm5hFHF7gngCPI_RmdKVaiw9-8')
			.end((error,response) => {
				expect(response.statusCode).to.equal(404);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	// mentor reject session tests

	it('changes status of a session to rejected', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/1/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should only allow mentors to reject sessions', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/1/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
			.end((error,response) => {
				expect(response.statusCode).to.equal(400);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should not reject another mentor\'s session', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/2/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
			.end((error,response) => {
				expect(response.statusCode).to.equal(403);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should not reject a non-existent session', function(done){
		chai.request(app)
			.patch('/api/v1/sessions/456/reject')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW50b3JJZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNiQGdtYWlsLmNvbSIsImlzTWVudG9yIjp0cnVlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjY4MTMwN30.-JhfbuogS8jeAeoBxCm5hFHF7gngCPI_RmdKVaiw9-8')
			.end((error,response) => {
				expect(response.statusCode).to.equal(404);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	// user create review tests

	it('creates a review on accepted session', function(done){
		chai.request(app)
			.post('/api/v1/sessions/2/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDAwMjMwfQ._IaMtX-xuzuygTav0D7MNtQ9rsQVZwOcM8wVQWu9ygE')
			.send({
				score: 5,
				remark: 'Excellent session! Real insightful to me'
			})
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('does not create review on pending sessions', function(done){
		chai.request(app)
			.post('/api/v1/sessions/3/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDAwMjMwfQ._IaMtX-xuzuygTav0D7MNtQ9rsQVZwOcM8wVQWu9ygE')
			.send({
				score: 5,
				remark: 'Excellent session! Real insightful to me'
			})
			.end((error,response) => {
				expect(response.statusCode).to.equal(403);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('allows users to review their sessions only', function(done){
		chai.request(app)
			.post('/api/v1/sessions/4/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDAwMjMwfQ._IaMtX-xuzuygTav0D7MNtQ9rsQVZwOcM8wVQWu9ygE')
			.send({
				score: 5,
				remark: 'Excellent session! Real insightful to me'
			})
			.end((error,response) => {
				expect(response.statusCode).to.equal(403);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	// tests for admin delete review 

	it('does not allow non-admins to delete a review', function(done){
		chai.request(app)
			.delete('/api/v1/sessions/2/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY3MDA2NzI3fQ.Z7FidxN0HSkGlGI4O9jPFybsw7dCsC5HPT7QdoeNcuk')
			.end((error,response) => {
				expect(response.statusCode).to.equal(403);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('allows admin to delete a review', function(done){
		chai.request(app)
			.delete('/api/v1/sessions/3/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDA1OTcyfQ.0nZI44TqlVYhUA1kFJaazpAak6uqVPDs6f9kVyhgrzk')
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('cannot delete a non-existent session review', function(done){
		chai.request(app)
			.delete('/api/v1/sessions/34/review')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDA1OTcyfQ.0nZI44TqlVYhUA1kFJaazpAak6uqVPDs6f9kVyhgrzk')
			.end((error,response) => {
				expect(response.statusCode).to.equal(404);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});
});
