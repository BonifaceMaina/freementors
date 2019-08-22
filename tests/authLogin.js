const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('request');
const app = require('../index');

describe('login tests', function(){

    it('should create a user successfully', (done) => {
        chai.request(app)
        .post('/auth/signin')
        .send({
            email: 'karisbm@gmail.com', 
            password: 'eagle15'
        })
        .end((error, response) => {
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            expect(response.statusCode).to.equal(201);
            expect(response).to.have.property('message','User created successfully');
            console.log(url);
            if(error) done(error);
            done();
        });
    });
});