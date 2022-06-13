import request from 'supertest';
import App from './Mock/AppTest';

let app = new App();

describe('GET employee', () => {


    test('Verify if status code is 200', async () => {
        const response = await request(app.getExpressApp()).get('/employees');

        expect(response.statusCode).toBe(200);
    });
});
