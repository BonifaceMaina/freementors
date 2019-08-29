const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
chai.use(chaiHttp);
const expect = chai.expect;

describe('login tests', function(){

	it('should login a user successfully', (done) => {
		chai.request('http://localhost:3000/api/v1')
			.post('/auth/signin')
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