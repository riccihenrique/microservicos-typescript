import request from 'supertest';
import App from '../src/App';
const { Pool } = require('pg');

let app = new App();

// setup for to mock pg
jest.mock('pg', () => {
  const mPool = {
    connect: function () {
      return { query: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

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
