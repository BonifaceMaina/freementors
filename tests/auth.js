const config = require('config');
const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('request');
const baseUrl = 'http://localhost:3000/api/v1/';
const app = require('../index');
var should = require('chai').should();

describe('check auth routes', () => {

    it('returns the get method of the base auth', (done) => {
        request.get({url: baseUrl + 'auth'}, 
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            // console.log(url);
            done();
        });
    });

    it('should create a user successfully', (done) => {
        chai.request("http://localhost:3000/api/v1")
        .post('/auth/signup')
        .send({
            firstName: 'Boniface', 
            lastName: 'Maina',
            email: 'karibm@gmail.com', 
            password: 'eagle15', 
            address: 'Kigali', 
            bio: 'Developer, Farmer',
            occupation: 'Code Ninja',
            expertise: 'experienced juggler'
        })
        .end((error, response) => {
            assert.equal(response.statusCode, 201);
            expect(response).to.be.an('object');
            expect(response.body).to.have.property('message','User created successfully');
            if(error) done(error);
            done();
        });
    });

    it('should not allow invalid firstname', (done) => {
        chai.request("http://localhost:3000/api/v1/")
        .post('auth/signup')
        .send({
            firstname: '987453', 
            lastname: 'Maina',
            email: 'karisbm@gmailcom', 
            password: 'eagle15', 
            address: 'Kigali', 
            bio: 'Developer, Farmer',
            occupation: 'Code Ninja',
            expertise: 'experienced juggler',
        })
        .end((error, response) => {
            assert.equal(response.statusCode, 400);
            expect(response).to.be.an('object');
            // expect(response.body).to.have.property('message','User created successfully');
            if(error) done(error);
            done();
        });
    });

    it('should not allow invalid lastname', (done) => {
        chai.request("http://localhost:3000/api/v1/")
        .post('auth/signup')
        .send({
            firstname: 'Boniface', 
            lastname: '3456457',
            email: 'karisbm@gmailcom', 
            password: 'eagle15', 
            address: 'Kigali', 
            bio: 'Developer, Farmer',
            occupation: 'Code Ninja',
            expertise: 'experienced juggler',
        })
        .end((error, response) => {
            assert.equal(response.statusCode, 400);
            expect(response).to.be.an('object');
            if(error) return done();
            done();
        });
    });

    it('should not allow invalid firstname', (done) => {
        chai.request('http://localhost:3000/api/v1/')
        .post('auth/signup')
        .send({
            firstname: '987453', 
            lastname: 'Maina',
            email: 'karisbm@gmailcom', 
            password: 'eagle15', 
            address: 'Kigali', 
            bio: 'Developer, Farmer',
            occupation: 'Code Ninja',
            expertise: 'experienced juggler',
        })
        .end((error, response) => {
            assert.equal(response.statusCode, 400);
            expect(response).to.be.an('object');
            if(error) return done();
            done();
        });
    });

    it('should not allow invalid emails', (done) => {
        chai.request('http://localhost:3000/api/v1/')
        .post('auth/signup')
        .send({
            firstname: 'Boniface', 
            lastname: 'Maina',
            email: 'karisbm@gmailcom', 
            password: 'eagle15', 
            address: 'Kigali', 
            bio: 'Developer, Farmer',
            occupation: 'Code Ninja',
            expertise: 'experienced juggler',
        })
        .end((error, response) => {
            assert.equal(response.statusCode, 400);
            expect(response).to.be.an('object');
            if(error) return done();
            done();
        });
    });

    it('should not allow one email twice', (done) => {
        chai.request('http://localhost:3000/api/v1/')
        .post('auth/signup')
        .send({
            firstname: 'Boniface', 
            lastname: 'Maina',
            email: 'karisbm@gmailcom', 
            password: 'eagle15', 
            address: 'Kigali', 
            bio: 'Developer, Farmer',
            occupation: 'Code Ninja',
            expertise: 'experienced juggler',
        })
        .end((error, response) => {
            assert.equal(response.statusCode, 400);
            expect(response).to.be.an('object');
            if(error) return done();
            done();
        });
    });
});
