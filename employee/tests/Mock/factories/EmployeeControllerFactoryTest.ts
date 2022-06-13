import EmployeeRepositoryTest from '../repositories/EmployeeRepositoryTest';
import EmployeeService from '../../../src/services/EmployeeService';
import EmployeeController from '../../../src/controllers/EmployeeController';
import BrokerServerTest from '../broker/BrokerServerTest';
import EnterpriseRepositoryTest from '../repositories/EnterpriseRepositoryTest';

class EmployeeControllerFactoryTest {
    create(): EmployeeController {
        const employeeRepository = new EmployeeRepositoryTest();
        const enterpriseRepository = new EnterpriseRepositoryTest();
        const employeeService = new EmployeeService(employeeRepository, enterpriseRepository, new BrokerServerTest());
        const employeeController = new EmployeeController(employeeService);

        return employeeController;
    }
}

export default EmployeeControllerFactoryTest;