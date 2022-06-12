import EmployeeDeleted from "../events/handles/employee/EmployeeDeleted";
import EmployeeRepository from "../models/repository/EmployeeRepository";
import connection from '../models/connection';

class EmployeeDeletedFactory {
    create() {
        const employeeRepository = new EmployeeRepository(connection);
        return new EmployeeDeleted(employeeRepository);
    }
}

export default EmployeeDeletedFactory;
