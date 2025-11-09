import request from "supertest";
import app from "../app";

    // Jest testing endpoint /api/auth/register by providing data and checking its response code and has property id and message returned    
describe('Auth API', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: "Password@123"
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('message', 'Registration successful.');
        expect(response.body.user).toHaveProperty('id');
    });

    // Jest testing endpoint /api/auth/login by providing data and checking its response code and has property token returned    
    it('should login a user', async() => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'Password@123'
            });

            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty('token');
    });
});