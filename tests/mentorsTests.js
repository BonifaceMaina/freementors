import chai from 'chai';
const expect = chai.expect;
import app from '../index';
import users from './mocks/mocks';

describe('check mentor routes', function(){

	it('returns all mentors', function(done){
		chai.request(app)
			.get('/api/v1/mentors')
			.set('token', users.userToken)
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				if(error) done(error);
				done();        
			});    
	});

	it('returns a specific mentor', function(done){
		chai.request(app)
			.get('/api/v1/mentors/1')
			.set('token', users.userToken)
			.end((error,response) => {
				expect(response.statusCode).to.equal(200);
				if(error) done(error);
				done();
			});    
	});
});