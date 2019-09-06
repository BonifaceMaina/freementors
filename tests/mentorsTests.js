import chai from 'chai';
const expect = chai.expect;
import assert from 'assert';
import app from '../index';

describe('check mentor routes', function(){

	it('should get all mentors', (done) => {
		chai.request(app)
			.get('/api/v1/mentors')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NjYwNzM3fQ.RI1pwpCLVoAYI_q4TmUdHlsyz22iuemBLuj8Ihe3Lt8')
			.end((error, response) => {
				expect(response).to.be.an('object');
				assert.equal(200, response.statusCode);
				// expect(response).to.include('message');
				if(error) done(error);
				done();
			});
	});

	it('returns all mentors', function(done){
		chai.request(app)
			.get('/api/v1/mentors')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NjYwNzM3fQ.RI1pwpCLVoAYI_q4TmUdHlsyz22iuemBLuj8Ihe3Lt8')
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				if(error) done(error);
				done();        
			});    
	});

	it('returns a specific mentor', function(done){
		chai.request(app)
			.get('/api/v1/mentors/1')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NjYwNzM3fQ.RI1pwpCLVoAYI_q4TmUdHlsyz22iuemBLuj8Ihe3Lt8')
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				if(error) done(error);
				done();
			});    
	});
});