import request from 'supertest';
import App from '../src/App';

let app = new App();

describe('GET employee', () => {
    beforeAll(() => {
        jest.mock('../src/models/repository/EnterpriseRepository', () => {
            return {
              findAll: jest.fn().mockImplementation(() => {
                return [];
              })
            };
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('Verify if status code is 200', async () => {
        const response = await request(app.getExpressApp()).get('/enterprises');

        expect(response.statusCode).toBe(200);
    });
});
