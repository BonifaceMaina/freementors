import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import app from '../index';
chai.use(chaiHttp);
const expect = chai.expect;

describe('login tests', function(){

	it('should login a user successfully', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signin')
			.send({
				email: 'karis@gmail.com', 
				password: 'karis123'
			})
			.end((error, response) => {
				expect(response).to.be.an('object');
				assert.equal(response.statusCode, 200);
				if(error) done(error);
				done();
			});
	});
});