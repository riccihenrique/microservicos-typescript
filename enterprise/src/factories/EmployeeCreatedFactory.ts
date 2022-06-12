import EmployeeCreated from "../events/handles/employee/EmployeeCreated";
import EmployeeRepository from "../models/repository/EmployeeRepository";
import EnterpriseRepository from "../models/repository/EnterpriseRepository";
import connection from '../models/connection';

class EmployeeCreatedFactory {
    create() {
        const enterpriseRepository = new EnterpriseRepository(connection);
        const employeeRepository = new EmployeeRepository(connection);
        return new EmployeeCreated(employeeRepository, enterpriseRepository);
    }
}

export default EmployeeCreatedFactory;
