import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import app from '../index';
import users  from './mocks/mocks';
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('check auth routes', () => {

	it('should create a user successfully', (done) => {
	    chai.request(app)
	    .post('/api/v1/auth/signup')
	    .send(users.newUser)
	    .end((error, response) => {
			assert.equal(response.statusCode, 201);
			// response.should.have.status(201);
	        // expect(response).to.be.an('object');
	        if(error) done(error);
	        done();
	    });
	});

	it('should not allow invalid firstname', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(users.invalidFname)
			.end((error, response) => {
				assert.equal(response.statusCode, 400);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();
			});
	});

	it('should not allow invalid lastname', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(users.invalidLname)
			.end((error, response) => {
				assert.equal(response.statusCode, 400);
				expect(response).to.be.an('object');
				if(error) return done();
				done();
			});
	});

	it('should not allow invalid emails', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(users.invalidEmail)
			.end((error, response) => {
				assert.equal(response.statusCode, 400);
				expect(response).to.be.an('object');
				if(error) return done();
				done();
			});
	});

	it('should not allow one email twice', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(users.duplicateEmail)
			.end((error, response) => {
				assert.equal(response.statusCode, 400);
				expect(response).to.be.an('object');
				if(error) return done();
				done();
			});
	});
});
