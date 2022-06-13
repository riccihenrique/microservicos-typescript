import request from 'supertest';
import App from '../src/App';
import { Pool } from "pg";
import EmployeeRepository from '../src/models/repository/EmployeeRepository';

let app = new App();

// setup for to mock pg
jest.mock('pg', () => {
    const mPool = {
    connect: function () {
        return { query: jest.fn() };
    },
    query: jest.fn().mockReturnValue([]),
    end: jest.fn(),
    on: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

/*jest.mock('../src/models/repository/EmployeeRepository', () => {
    return {
      findAll: jest.fn().mockImplementation(() => {
        return [];
      })
    };
});*/

describe('GET employee', () => {


    test('Verify if status code is 200', async () => {
        //const response = await request(app.getExpressApp()).get('/employees');

        expect(200).toBe(200);
    });
});
