const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let ApiError = require("../middleware/ErrorTypes");

//Require the dev-dependencies
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

let chaiHttp = require('chai-http');
let server = require('../index');
// Then either:
let expect = chai.expect;
// or:
let assert = chai.assert;
let should = chai.should();

let token;

let mongoServer;
const opts = { useNewUrlParser: true, dbName: "test", useCreateIndex: true, useUnifiedTopology: true };

chai.use(chaiHttp);

const testUser = {
    email: "test@email.com",
    password: "hello123",
    type: "vendor",
    otherInfo: {
        companyName: "Lumaki",
        address: "425 John St, Waterloo, Canada"
    }
};

const wrongPass = {
    email: "test@email.com",
    password: "hello122"
}

const rightPass = {
    email: "test@email.com",
    password: "hello123"
}

const examplePosting = {
    position : "Software Engineer Intern",
    description: "You can do cool stuff here!",
    duration: "September - December 2021",
    deadline: "July 24th, 2021"
}

const internLumakiQuery = {
    company: "lumaki",
    title: "intern"
}

const internGoogleQuery = {
    company: "google",
    title: "intern"
}

describe('Integration Test', () => {

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        // disconnect from real server running and use mock server instead...idk how to do this better
        await mongoose.disconnect();
        await mongoose.connect(mongoUri, opts);
        token = null;
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        token = null;
    });

    describe('Registration Process', () => {


        it('should register success', (done) => {
            chai.request(server)
                .post('/user/register')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });

        it('login fail', () => {
            chai.request(server)
                .post('/user/login')
                .send(wrongPass).should.eventually.throw(ApiError.LoginFailError);
        });

        it('login success', (done) => {
            chai.request(server)
                .post('/user/login')
                .send(rightPass)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("token");
                    res.body.should.have.property("email");
                    res.body.email.should.eql(rightPass.email);
                    token = res.body.token;
                    done();
                })
        });

        it('create posting no auth', () => {
            chai.request(server)
                .post('/posting')
                .send(examplePosting).should.eventually.throw(ApiError.PermissionDeniedError);
        });

        it('create posting with auth', (done) => {
            chai.request(server)
                .post('/posting')
                .auth(token, { type: 'bearer' })
                .send(examplePosting)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('get postings of lumaki posting', (done) => {
            chai.request(server)
                .get('/posting')
                .query(internLumakiQuery)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("postings");
                    res.body.postings.length.should.eql(1);
                    res.body.postings[0].company.should.eql(internLumakiQuery.company);
                    done();
                });
        });

        it('get postings of query with no existing posting', (done) => {
            chai.request(server)
                .get('/posting')
                .query(internGoogleQuery)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("postings");
                    res.body.postings.length.should.eql(0);
                    done();
                });
        });

    });

});
