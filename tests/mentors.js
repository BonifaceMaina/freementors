const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const baseUrl = 'http://localhost:3000/api/v1/';


describe('check mentor routes', function(){

    it('returns all mentors', function(done){
        chai.request("http://localhost:3000/api/v1/mentors")
        .get('/')
        .end((request,response) => {
            expect(response.statusCode).to.equal(401);
        });    
    });

    it('returns a specific mentor', function(done){
        chai.request("http://localhost:3000/api/v1/mentors/:mentorId")
        .get('/')
        .end((request,response) => {
            expect(response.statusCode).to.equal(401);
        });    
    });
});