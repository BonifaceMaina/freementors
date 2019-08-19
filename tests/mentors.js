const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const baseUrl = 'http://localhost:3000/api/v1/';


describe('check mentor routes', function(){

    it('returns all mentors', function(done){
        request.get({url:baseUrl + 'mentors/'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });

    it('returns a specific mentor', function(done){
        request.get({url:baseUrl + 'mentors/:id'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });
});