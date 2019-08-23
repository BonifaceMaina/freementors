const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const baseUrl = 'http://localhost:3000/api/v1/';


describe('check mentor routes', function(){

    it('returns all mentors', function(done){
        chai.request("http://localhost:3000/api/v1/mentors")
        .get('/')
        .end((error,response) => {
            expect(response.statusCode).to.equal(401);
            if(error) done(error);
            done();        
        });    
    });

    it('returns a specific mentor', function(done){
        chai.request("http://localhost:3000/api/v1/mentors/1")
        .get('/')
        .end((error,response) => {
            expect(response.statusCode).to.equal(401);
            if(error) done(error);
            done();
        });    
    });
});