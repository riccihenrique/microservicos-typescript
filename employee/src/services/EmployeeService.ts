import Employee from "../models/entities/Employee";
import EmployeeDTO from "../DTOs/EmployeeDTO";
import ConflictError from "../errors/ConflictError";
import IEmployeeService from "./IEmployeeService";
import NotFoundError from "../errors/NotFoundError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import IEmployeeRepository from "../models/repository/IEmployeeRepository";
import IEnterpriseRepository from "../models/repository/IEnterpriseRepository";
import BadRequestError from "../errors/BadRequestError";
import IBrokerServer from "../broker/server/IBrokerServer";
import { RABBIT_CONFIG } from "../broker/config";

class EmployeeService implements IEmployeeService {
    constructor(
        private employeeRepository: IEmployeeRepository,
        private enterpriseRepository: IEnterpriseRepository,
        private messageBroker: IBrokerServer,
    ) { }

    async create(employeeData: EmployeeDTO) {
        const { nome, cpf, email, endereco } = employeeData;
        let employee: Employee = new Employee(nome, cpf, email, endereco);

        if(!employeeData.empresas || employeeData.empresas.length === 0)
            throw new BadRequestError('O campo empresas é obrigatório');

        const employeeFound = await this.employeeRepository.findByCPF(employee.cpf);
        if(employeeFound) throw new ConflictError('CPF já cadastrado');

        employee = await this.enterprise_check(employee, employeeData.empresas);

        const employeeCreated = await this.employeeRepository.create(employee);
        this.messageBroker.publishInExchange(
            RABBIT_CONFIG.EXCHANGE_NAME,
            RABBIT_CONFIG.QUEUE_EMPLOYEE_CREATED,
            Employee.toDTO(employeeCreated)
        );

        return employeeCreated;
    }

    async update(employeeData: EmployeeDTO): Promise<Employee> {
        const employeeFound = await this.employeeRepository.findById(employeeData.id as number);

        if(!employeeFound)
            throw new NotFoundError('Colaborador não encontrado');

        let employee: Employee = new Employee(employeeData.nome, employeeData.cpf, employeeData.email, employeeData.endereco);
        employee.id = employeeData.id as number;

        if(employee.cpf !== employeeFound.cpf)
            throw new UnprocessableEntityError('O CPF não pode ser alterado');

        if(!employeeData.empresas || employeeData.empresas.length === 0)
            throw new BadRequestError('O campo empresas é obrigatório');

        employee = await this.enterprise_check(employee, employeeData.empresas);

        const employeeUpdated = await this.employeeRepository.update(employee);
        this.messageBroker.publishInExchange(
            RABBIT_CONFIG.EXCHANGE_NAME,
            RABBIT_CONFIG.QUEUE_EMPLOYEE_UPDATED,
            Employee.toDTO(employeeUpdated)
        );

        return employeeUpdated;
    }

    async delete(id: number): Promise<void> {
        const employeeFound = await this.employeeRepository.findById(id);

        if(!employeeFound) throw new NotFoundError('Colaborador não encontrado');

        this.messageBroker.publishInExchange(
            RABBIT_CONFIG.EXCHANGE_NAME,
            RABBIT_CONFIG.QUEUE_EMPLOYEE_DELETED,
            Employee.toDTO(employeeFound)
        );

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

    private async enterprise_check(employee: Employee, enterprises: string[]): Promise<Employee> {
        for(let cnpj of enterprises) {
            cnpj = cnpj.replace(/[^\d]+/g, '');
            const enterprise = await this.enterpriseRepository.findByCNPJ(cnpj);
            if(!enterprise) throw new NotFoundError(`Empresa não encontrada`);
            employee.addEmpresas(enterprise);
        }
        return employee;
    }
}

export default EmployeeService;