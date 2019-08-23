const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('request');
const app = require('../index');

describe('user action tests', function(){

    it('should get all mentors', (done) => {
        chai.request('http://localhost:3000/api/v1')
        .get('/mentors')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiYmlvIjoiYW5pbWFsIGxvdmVyIiwiaWF0IjoxNTY2NTQ4MjkxfQ.UNAJ9DHlSXc1I2EXmYaYd9h_6fwbFiZCTgc1RM82Vy8')
        .end((error, response) => {
            assert.equal(response.statusCode, 200);
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            if(error) done(error);
            done();
        });
    });
});