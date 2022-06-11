import connection from '../models/connection';
import EmployeeRepository from '../models/repository/EmployeeRepository';
import EmployeeService from '../services/EmployeeService';
import EmployeeController from '../controllers/EmployeeController';

class EmployeeFactory {
    create(): EmployeeController {
        const employeeRepository = new EmployeeRepository(connection);
        const employeeService = new EmployeeService(employeeRepository);
        const employeeController = new EmployeeController(employeeService);

        return employeeController;
    }
}

export default EmployeeFactory;