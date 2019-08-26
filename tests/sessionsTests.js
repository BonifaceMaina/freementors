const chai = require('chai');
const expect = chai.expect;
const request = require('request');


describe('check session routes', function(){

    it('creates a new sessions', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .post('/')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyQGdtYWlsLmNvbSIsImlzTWVudG9yIjpmYWxzZSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjY4MjIxNDh9.6e5fHs1YoJc9nArP3fz0s9-tisIkjYt7BhpzXk4HllI')
        .send({
            mentorId: 1,
            questions: 'how do I learn programming?'
        })
        .end((error,response) => {
            expect(response.statusCode).to.equal(201);
            if(error) done(error);
            done();        
        });
    });

    it('returns all sessions for a user', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .get('/')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyQGdtYWlsLmNvbSIsImlzTWVudG9yIjpmYWxzZSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjY4MjIxNDh9.6e5fHs1YoJc9nArP3fz0s9-tisIkjYt7BhpzXk4HllI')
        .end((error,response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    it('returns all sessions for a mentor', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .get('/')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW50b3JJZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNiQGdtYWlsLmNvbSIsImlzTWVudG9yIjp0cnVlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjY4MTMwN30.-JhfbuogS8jeAeoBxCm5hFHF7gngCPI_RmdKVaiw9-8')
        .end((error,response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    // mentor accept session tests
    it('changes status of a session to accepted', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .patch('/1/accept')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
        .end((error,response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    it('should only allow mentor to change status of session', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .patch('/1/accept')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
        .end((error,response) => {
            expect(response.statusCode).to.equal(400);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    it('should not change another mentor\'s session', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .patch('/2/accept')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
        .end((error,response) => {
            expect(response.statusCode).to.equal(403);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

    it('should not accept a non-existent session', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .patch('/456/accept')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW50b3JJZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNiQGdtYWlsLmNvbSIsImlzTWVudG9yIjp0cnVlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjY4MTMwN30.-JhfbuogS8jeAeoBxCm5hFHF7gngCPI_RmdKVaiw9-8')
        .end((error,response) => {
            expect(response.statusCode).to.equal(404);
            expect(response).to.be.an('object');
            if(error) done(error);
            done();        
        });
    });

// mentor reject session tests

it('changes status of a session to rejected', function(done){
    chai.request("http://localhost:3000/api/v1/sessions")
    .patch('/1/reject')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
    .end((error,response) => {
        expect(response.statusCode).to.equal(200);
        expect(response).to.be.an('object');
        if(error) done(error);
        done();        
    });
});

it('should only allow mentors to reject sessions', function(done){
    chai.request("http://localhost:3000/api/v1/sessions")
    .patch('/1/reject')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
    .end((error,response) => {
        expect(response.statusCode).to.equal(400);
        expect(response).to.be.an('object');
        if(error) done(error);
        done();        
    });
});

it('should not reject another mentor\'s session', function(done){
    chai.request("http://localhost:3000/api/v1/sessions")
    .patch('/2/reject')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4')
    .end((error,response) => {
        expect(response.statusCode).to.equal(403);
        expect(response).to.be.an('object');
        if(error) done(error);
        done();        
    });
});

it('should not reject a non-existent session', function(done){
    chai.request("http://localhost:3000/api/v1/sessions")
    .patch('/456/reject')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW50b3JJZCI6MiwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNiQGdtYWlsLmNvbSIsImlzTWVudG9yIjp0cnVlLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjY4MTMwN30.-JhfbuogS8jeAeoBxCm5hFHF7gngCPI_RmdKVaiw9-8')
    .end((error,response) => {
        expect(response.statusCode).to.equal(404);
        expect(response).to.be.an('object');
        if(error) done(error);
        done();        
    });
});


    // it('deletes a session review', function(done){
    //     request.delete({url:baseUrl + 'sessions/:sessionId/review/delete'}, 
    //     function(error, response, body){
    //         expect(response.statusCode).to.equal(200);
    //         console.log(body);
    //         done();
    //     });
    // });
});
