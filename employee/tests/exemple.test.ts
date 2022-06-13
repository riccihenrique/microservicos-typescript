import request from 'supertest';
import App from '../src/App';
import { Pool } from "pg";
import EmployeeRepository from '../src/models/repository/EmployeeRepository';

let app = new App();

describe('GET employee', () => {
    beforeAll(() => {
        jest.mock('../src/models/repository/EmployeeRepository', () => {
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
        const response = await request(app.getExpressApp()).get('/employees');

        expect(response.statusCode).toBe(200);
    });
});
