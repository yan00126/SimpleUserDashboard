const app = require('../server/index'); // Corrected path to server/index.js
const User = require('../server/models/user'); // Corrected path to user model

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Before running any test, spin up the in-memory server and connect to it
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After running all tests, disconnect and stop the server
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// After each test, clear the database to ensure isolation
afterEach(async () => {
    await User.deleteMany();
});

describe('User Creation Endpoint', () => {
    it('should create a new user successfully', async () => {
        const newUser = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user'
        };

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .expect(201); // Expect status code 201 for successful creation

        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    it('should fail to create a user with missing required fields', async () => {
        const incompleteUser = {
            email: 'john@example.com'
        };

        const response = await request(app)
            .post('/users')
            .send(incompleteUser)
            .expect(400); // Expect status code 400 for bad request

        expect(response.body).toHaveProperty('error');
    });

    it('should fail to create a user with an invalid email format', async () => {
        const invalidUser = {
            name: 'John Doe',
            email: 'invalid-email',
            password: 'password123',
            role: 'user'
        };

        const response = await request(app)
            .post('/users')
            .send(invalidUser)
            .expect(400); // Expect status code 400 for bad request

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('validation failed');
    });
});
