import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import app from '../index';
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('check auth routes', () => {

	it('should create a user successfully', (done) => {
	    chai.request(app)
	    .post('/api/v1/auth/signup')
	    .send({
	        firstName: 'Boniface', 
	        lastName: 'Maina',
	        email: 'karibm@gmail.com', 
	        password: 'eagle15', 
	        address: 'Kigali', 
	        bio: 'Developer, Farmer',
	        occupation: 'Code Ninja',
	        expertise: 'experienced juggler'
	    })
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
			.send({
				firstname: '987453', 
				lastname: 'Maina',
				email: 'karisbm@gmailcom', 
				password: 'eagle15', 
				address: 'Kigali', 
				bio: 'Developer, Farmer',
				occupation: 'Code Ninja',
				expertise: 'experienced juggler',
			})
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
			.send({
				firstname: 'Boniface', 
				lastname: '3456457',
				email: 'karisbm@gmailcom', 
				password: 'eagle15', 
				address: 'Kigali', 
				bio: 'Developer, Farmer',
				occupation: 'Code Ninja',
				expertise: 'experienced juggler',
			})
			.end((error, response) => {
				assert.equal(response.statusCode, 400);
				expect(response).to.be.an('object');
				if(error) return done();
				done();
			});
	});

	it('should not allow invalid firstname', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send({
				firstname: '987453', 
				lastname: 'Maina',
				email: 'karisbm@gmailcom', 
				password: 'eagle15', 
				address: 'Kigali', 
				bio: 'Developer, Farmer',
				occupation: 'Code Ninja',
				expertise: 'experienced juggler',
			})
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
			.send({
				firstname: 'Boniface', 
				lastname: 'Maina',
				email: 'karisbm@gmailcom', 
				password: 'eagle15', 
				address: 'Kigali', 
				bio: 'Developer, Farmer',
				occupation: 'Code Ninja',
				expertise: 'experienced juggler',
			})
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
			.send({
				firstname: 'Boniface', 
				lastname: 'Maina',
				email: 'karisbm@gmailcom', 
				password: 'eagle15', 
				address: 'Kigali', 
				bio: 'Developer, Farmer',
				occupation: 'Code Ninja',
				expertise: 'experienced juggler',
			})
			.end((error, response) => {
				assert.equal(response.statusCode, 400);
				expect(response).to.be.an('object');
				if(error) return done();
				done();
			});
	});
});
