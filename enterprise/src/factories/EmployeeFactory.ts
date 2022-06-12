import EmployeeDTO from "../DTOs/EmployeeDTO";
import Employee from "../models/entities/Employee";

class EmployeeFactory {
    create(data: EmployeeDTO) {
        const employee = new Employee(data.nome, data.cpf, data.email, data.endereco, data.idIntegracao);
        employee.id = data.id || 0;
        return employee;
    }
}

export default EmployeeFactory;