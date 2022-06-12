import EmployeeDTO from "../../../DTOs/EmployeeDTO";
import IEmployeeRepository from "../../../models/repository/IEmployeeRepository";

class EmployeeDeleted {
    constructor(
        private employeeRepository: IEmployeeRepository
    ) { }

    async handle(employeeData: EmployeeDTO) {
        const employeeFound = await this.employeeRepository.findByCPF(employeeData.cpf);
        if(employeeFound) {
            await this.employeeRepository.delete(employeeData.id as number);
        }
        else {
            // Usuário não existe.
        }
    }
}

export default EmployeeDeleted;