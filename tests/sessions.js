const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const baseUrl = 'http://localhost:3000/api/v1/';


describe('check auth routes', function(){

    it('returns all sessions', function(done){
        request.get({url:baseUrl + 'sessions/'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });

    it('creates a new sessions', function(done){
        request.post({url:baseUrl + 'sessions/'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });

    it('changes status of a session to accepted', function(done){
        request.patch({url:baseUrl + 'sessions/:sessionId/accept'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });

    it('changes status of a session to rejected', function(done){
        request.patch({url:baseUrl + 'sessions/:sessionId/reject'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });

    it('posts session review', function(done){
        request.post({url:baseUrl + 'sessions/:sessionId/review'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });

    it('deletes a session review', function(done){
        request.delete({url:baseUrl + 'sessions/:sessionId/review/delete'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });
});
