const chai = require('chai');
const expect = chai.expect;
const request = require('request');


describe('check session routes', function(){

    it('creates a new sessions', function(done){
        chai.request("http://localhost:3000/api/v1/sessions")
        .post('/')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NTQ4MjkxfQ.UNAJ9DHlSXc1I2EXmYaYd9h_6fwbFiZCTgc1RM82Vy8')
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

    // it('returns all sessions for a user', function(done){
    //     chai.request("http://localhost:3000/api/v1/sessions")
    //     .post('/')
    //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NTQ4MjkxfQ.UNAJ9DHlSXc1I2EXmYaYd9h_6fwbFiZCTgc1RM82Vy8')
    //     .end((error,response) => {
    //         expect(response.statusCode).to.equal(200);
    //         expect(response).to.be.an('object');
    //         if(error) done(error);
    //         done();        
    //     });
    // });

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

    // it('changes status of a session to accepted', function(done){
    //     chai.request("http://localhost:3000/api/v1/sessions")
    //     .post('/')
    //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NTQ4MjkxfQ.UNAJ9DHlSXc1I2EXmYaYd9h_6fwbFiZCTgc1RM82Vy8')
    //     .end((error,response) => {
    //         expect(response.statusCode).to.equal(200);
    //         expect(response).to.be.an('object');
    //         if(error) done(error);
    //         done();        
    //     });
    // });

    // it('changes status of a session to rejected', function(done){
    //     request.patch({url:baseUrl + 'sessions/:sessionId/reject'}, 
    //     function(error, response, body){
    //         expect(response.statusCode).to.equal(200);
    //         console.log(body);
    //         done();
    //     });
    // });

    // it('posts session review', function(done){
    //     request.post({url:baseUrl + 'sessions/:sessionId/review'}, 
    //     function(error, response, body){
    //         expect(response.statusCode).to.equal(200);
    //         console.log(body);
    //         done();
    //     });
    // });

    // it('deletes a session review', function(done){
    //     request.delete({url:baseUrl + 'sessions/:sessionId/review/delete'}, 
    //     function(error, response, body){
    //         expect(response.statusCode).to.equal(200);
    //         console.log(body);
    //         done();
    //     });
    // });
});
