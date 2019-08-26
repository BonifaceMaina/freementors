const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

describe('admin functionalities', function(){

    it('should upgrade user', function(done){
        chai.request("http://localhost:3000/api/v1")
        .patch('/user/3')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY2ODMxMTA2fQ.adZcrILRdsWXdS2q9daIob4Hbgvhcgj9jeLZbq1WxtY')
        .end((error,response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    it('should only allow admin to upgrade user', function(done){
        chai.request("http://localhost:3000/api/v1")
        .patch('/user/3')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiU2FtIiwiZW1haWwiOiJzYW1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjgzMTMzM30.203U8j9a7TtBNZYj0bR6qEIct0Bk2EG6BizhxVj-Ivc')
        .end((error,response) => {
            expect(response.statusCode).to.equal(403);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    it('should not upgrade non-existent user', function(done){
        chai.request("http://localhost:3000/api/v1")
        .patch('/user/476')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY2ODMxMTA2fQ.adZcrILRdsWXdS2q9daIob4Hbgvhcgj9jeLZbq1WxtY')
        .end((error,response) => {
            expect(response.statusCode).to.equal(404);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    it('should not upgrade non-mentor users', function(done){
        chai.request("http://localhost:3000/api/v1")
        .patch('/user/1')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY2ODMxMTA2fQ.adZcrILRdsWXdS2q9daIob4Hbgvhcgj9jeLZbq1WxtY')
        .end((error,response) => {
            expect(response.statusCode).to.equal(400);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

});