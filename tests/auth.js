const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('request');
const app = require('../index');



describe('check auth routes', function(){

    it('should create a user successfully', (done) => {
        chai.request(app)
        .post({uri: baseUrl + 'auth/signup'})
        .send({
            firstname: 'Boniface', 
            lastname: 'Maina',
            email: 'karisbm@gmail.com', 
            password: 'eagle15', 
            address: 'Kigali', 
            bio: 'Developer, Farmer',
            occupation: 'Code Ninja',
            expertise: 'experienced juggler',
            is_mentor: 'false'
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

    it('should not allow invalid firstname', (done) => {
        chai.request(app)
        .post({uri: baseUrl + 'auth/signup'})
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
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            expect(response.statusCode).to.equal(400);
            expect(response).to.have.property('error', 'Please enter a valid firstname');
            if(error) done(error);
            done();
        });
    });

    it('should not allow invalid lastname', (done) => {
        chai.request(app)
        .post({uri: baseUrl + 'auth/signup'})
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
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            expect(response.statusCode).to.equal(400);
            expect(response).to.have.property('error', 'Please enter a valid lastname');
            if(error) return done();
            done();
        });
    });

    it('should not allow invalid firstname', (done) => {
        chai.request(app)
        .post({uri: baseUrl + 'auth/signup'})
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
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            expect(response.statusCode).to.equal(201);
            expect(response).to.have.property('error', 'Please enter a valid firstname');
            if(error) return done();
            done();
        });
    });

    it('should not allow invalid emails', (done) => {
        chai.request(app)
        .post({uri: baseUrl + 'auth/signup'})
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
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            expect(response).to.have.property('error', 'Please enter a valid email address');

            if(error) return done();
            done();
        });
    });

    it('should not allow one email twice', (done) => {
        chai.request(app)
        .post({uri: baseUrl + 'auth/signup'})
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
            expect(response).to.be.an('object');
            expect(response).to.include('message');
            expect(response).to.have.property('error', 'Email already taken');
            if(error) return done();
            done();
        });
    });
});
