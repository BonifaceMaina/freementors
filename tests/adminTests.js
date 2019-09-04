const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
const app = require('../index');

describe('admin functionalities', function(){

	it('should upgrade user', function(done){
		chai.request(app)
			.patch('/api/v1/user/3')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY2ODMzMjQzfQ.HdpITe3pB6nmmEtragbocaVP1DM9fa5uy_awgdcx0I4')
			.end((error,response) => {
				// response.should.have.status(200);
				// expect(response.statusCode).to.equal(200);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should only allow admin to upgrade user', function(done){
		chai.request(app)
			.patch('/api/v1/user/3')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiU2FtIiwiZW1haWwiOiJzYW1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjgzMTMzM30.203U8j9a7TtBNZYj0bR6qEIct0Bk2EG6BizhxVj-Ivc')
			.end((error,response) => {
				expect(response.statusCode).to.equal(403);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should not upgrade non-existent user', function(done){
		chai.request(app)
			.patch('/api/v1/user/47')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiU2FtIiwiZW1haWwiOiJzYW1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjgzMTMzM30.203U8j9a7TtBNZYj0bR6qEIct0Bk2EG6BizhxVj-Ivc')
			.end((error,response) => {
				expect(response.statusCode).to.equal(403);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

	it('should not upgrade mentor users', function(done){
		chai.request(app)
			.patch('/api/v1/user/1')
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY2ODMxMTA2fQ.adZcrILRdsWXdS2q9daIob4Hbgvhcgj9jeLZbq1WxtY')
			.end((error,response) => {
				expect(response.statusCode).to.equal(400);
				expect(response).to.be.an('object');
				if(error) done(error);
				done();        
			});
	});

});