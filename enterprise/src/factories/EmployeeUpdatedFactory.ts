import EmployeeUpdated from "../events/handles/employee/EmployeeUpdated";
import EmployeeRepository from "../models/repository/EmployeeRepository";
import EnterpriseRepository from "../models/repository/EnterpriseRepository";
import connection from '../models/connection';

class EmployeeUpdatedFactory {
    create() {
        const enterpriseRepository = new EnterpriseRepository(connection);
        const employeeRepository = new EmployeeRepository(connection);
        return new EmployeeUpdated(employeeRepository, enterpriseRepository);
    }
}

export default EmployeeUpdatedFactory;
