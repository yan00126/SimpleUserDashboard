const app = require('../index.js'); 
const User = require('../models/user.js');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

let connection;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection = connection; // Set the test connection
});

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
            name: 'JohnDoe',
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

    it('should fail to create a user with a duplicate email', async () => {
        const existingUser = {
            name: 'Existing User',
            email: 'duplicate@example.com',
            password: 'password123',
            role: 'user'
        };

        // Create the first user
        await request(app)
            .post('/users')
            .send(existingUser)
            .expect(201);

        // Attempt to create a user with the same email
        const response = await request(app)
            .post('/users')
            .send({ ...existingUser, name: 'Another User' }) // Different name, same email
            .expect(400);

        expect(response.body).toHaveProperty('error');
    });
});