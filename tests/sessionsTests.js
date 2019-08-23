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
        chai.request("http://localhost:3000/api/v1/sessions")
        .post('/')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NTQ4MjkxfQ.UNAJ9DHlSXc1I2EXmYaYd9h_6fwbFiZCTgc1RM82Vy8')
        .send({
            email: 'karis@gmail.com',
            questions: 'how do I learn programming?'
        })
        .end((error,response) => {
            expect(response.statusCode).to.equal(201);
            if(error) done(error);
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
