import EmployeeDTO from "../../../DTOs/EmployeeDTO";
import Employee from "../../../models/entities/Employee";
import Enterprise from "../../../models/entities/Enterprise";
import IEmployeeRepository from "../../../models/repository/IEmployeeRepository";
import IEnterpriseRepository from "../../../models/repository/IEnterpriseRepository";

class EmployeeUpdated {
    constructor(
        private employeeRepository: IEmployeeRepository,
        private enterpriseRepository: IEnterpriseRepository
    ) { }

    async handle(employeeData: EmployeeDTO): Promise<void> {
        const employeeFound = await this.employeeRepository.findByCPF(employeeData.cpf);
        if(employeeFound) {
            const employee = new Employee(employeeData.nome, employeeData.cpf, employeeData.email, employeeData.endereco, employeeData.id as number);
            employee.id = employeeFound.id;

            for(let cnpj of employeeData.empresas as string[]) {
                const enterprise = await this.enterpriseRepository.findByCNPJ(cnpj);
                employee.addEmpresas(enterprise as Enterprise);
            }
            await this.employeeRepository.update(employee);
        }
        else {
            // Usuário não existe.
        }
    }
}

export default EmployeeUpdated;