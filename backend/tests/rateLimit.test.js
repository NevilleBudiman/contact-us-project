const express = require('express');
const request = require('supertest');
const rateLimit = require('../middleware/rateLimit');

const app = express();
app.use(express.json());

app.post('/backend/save-form', rateLimit, (req, res) => {
    res.status(201).send({ message: 'Contact Us submitted successfully!' });
});

describe('Rate Limit Middleware', () => {
    it('should allow requests under limit', async () => {
        const response = await request(app).post('/backend/save-form').send({});

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Contact Us submitted successfully!');
    });

    it('should return 429 when limit is exceeded', async () => {
        for (let i = 0; i < 10; i++) {
            await request(app).post('/backend/save-form').send({});
        }

        const response = await request(app).post('/backend/save-form').send({});

        expect(response.status).toBe(429);
        expect(response.body.message).toBe('Too many requests, please try again later');
    });
});