import connection from '../models/connection';
import EmployeeRepository from '../models/repository/EmployeeRepository';
import EmployeeService from '../services/EmployeeService';
import EmployeeController from '../controllers/EmployeeController';
import EnterpriseRepository from '../models/repository/EnterpriseRepository';

class EmployeeFactory {
    create(): EmployeeController {
        const employeeRepository = new EmployeeRepository(connection);
        const enterpriseRepository = new EnterpriseRepository(connection);
        const employeeService = new EmployeeService(employeeRepository, enterpriseRepository);
        const employeeController = new EmployeeController(employeeService);

        return employeeController;
    }
}

export default EmployeeFactory;