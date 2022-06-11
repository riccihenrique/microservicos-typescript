import EmployeeDTO from "../../DTOs/EmployeeDTO";
import BadRequestError from "../../errors/BadRequestError";
import UnprocessableEntityError from "../../errors/UnprocessableEntityError";
import CPFValidator from "../../utils/CPFValidator";

class Employee {
    private _id: number = 0;
    private _nome: string = '';
    private _cpf: string = '';
    private _email: string = '';
    private _endereco: string = '';

    constructor(nome: string, cpf: string, email: string, endereco: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.email = email
    }

    get id() {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome: string) {
        if(!nome) throw new BadRequestError('Nome é obrigatório');
        this._nome = nome;
    }

    get cpf() {
        return this._cpf;
    }

    set cpf(cpf: string) {
        if(!cpf) throw new BadRequestError('CNPJ é obrigatório');

        cpf = cpf.replace(/[^\d]+/g, '');
        const cpfValidator = new CPFValidator();

        if(!cpfValidator.validate(cpf)) throw new UnprocessableEntityError('CPF inválido');

        this._cpf = cpf;
    }

    get endereco() {
        return this._endereco;
    }

    set endereco(endereco: string) {
        if(!endereco) throw new BadRequestError('Endereço é obrigatório');
        this._endereco = endereco;
    }

    get email() {
        return this._email;
    }

    set email(email: string) {
        if(!email) throw new BadRequestError('E-mail é obrigatório');

        if(!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email))
            throw new UnprocessableEntityError('E-mail inválido');

        this._email = email;
    }

    public static toDTO(employee: Employee) {
        return {
            id: employee.id,
            nome: employee.nome,
            cpf: employee.cpf,
            endereco: employee.endereco,
            email: employee.email,
        } as EmployeeDTO
    }
}

export default Employee;