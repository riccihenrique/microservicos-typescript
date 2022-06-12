import Employee from "../models/entities/Employee";
import EmployeeDTO from "../DTOs/EmployeeDTO";
import ConflictError from "../errors/ConflictError";
import IEmployeeService from "./IEmployeeService";
import NotFoundError from "../errors/NotFoundError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import IEmployeeRepository from "../models/repository/IEmployeeRepository";
import IEnterpriseRepository from "../models/repository/IEnterpriseRepository";
import BadRequestError from "../errors/BadRequestError";

class EmployeeService implements IEmployeeService {
    constructor(
        private employeeRepository: IEmployeeRepository,
        private enterpriseRepository: IEnterpriseRepository
    ) { }

    async create(employeeData: EmployeeDTO) {
        const { nome, cpf, email, endereco } = employeeData;
        const employee: Employee = new Employee(nome, cpf, email, endereco);

        if(!employeeData.empresas || employeeData.empresas.length === 0)
            throw new BadRequestError('O campo empresas é obrigatório');

        const employeeFound = await this.employeeRepository.findByCPF(employee.cpf);
        if(employeeFound) throw new ConflictError('CPF já cadastrado');

        for(let cnpj of employeeData.empresas) {
            cnpj = cnpj.replace(/[^\d]+/g, '');
            const enterprise = await this.enterpriseRepository.findByCNPJ(cnpj);
            if(!enterprise) throw new NotFoundError(`Empresa não encontrada`);
            employee.addEmpresas(enterprise);
        }

        const employeeCreated = await this.employeeRepository.create(employee);

        return employeeCreated;
    }

    async update(employeeData: EmployeeDTO): Promise<Employee> {
        const { id, nome, cpf, email, endereco } = employeeData;

        const employeeFound = await this.employeeRepository.findById(id as number);

        if(!employeeFound)
            throw new NotFoundError('Colaborador não encontrado');

        const employee: Employee = new Employee(nome, cpf, email, endereco);
        employee.id = id as number;

        if(employee.cpf !== employeeFound.cpf)
            throw new UnprocessableEntityError('O CPF não pode ser alterado');

        const employeeUpdated = await this.employeeRepository.update(employee);
        return employeeUpdated;
    }

    async delete(id: number): Promise<void> {
        const employeeFound = await this.employeeRepository.findById(id);

        if(!employeeFound) throw new NotFoundError('Colaborador não encontrado');

        await this.employeeRepository.delete(id);
    }

    findAll(): Promise<Employee[]> {
        return this.employeeRepository.findAll();
    }

    async findById(id: number): Promise<Employee> {
        const employeeFound = await this.employeeRepository.findById(id);

        if(!employeeFound) if(!employeeFound) throw new NotFoundError('Colaborador não encontrado');

        return employeeFound;
    }
}

export default EmployeeService;