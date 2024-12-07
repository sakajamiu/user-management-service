const request = require('supertest');
const app = require('../src/app'); // Adjust this path based on your app structure
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Registration and Login', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});