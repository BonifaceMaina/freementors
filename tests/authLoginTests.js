const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('request');
const app = require('../index');

describe('login tests', function(){

    it('should login a user successfully', (done) => {
        chai.request('http://localhost:3000/api/v1')
        .post('/auth/signin')
        .send({
            email: 'karis@gmail.com', 
            password: 'karis123'
        })
        .end((error, response) => {
            assert.equal(response.statusCode, 200);
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            expect(response).to.have.property('message','User is successfully logged in');
            if(error) done(error);
            done();
        });
    });
});