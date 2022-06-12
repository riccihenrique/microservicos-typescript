import EmployeeDTO from "../../DTOs/EmployeeDTO";
import BadRequestError from "../../errors/BadRequestError";
import ConflictError from "../../errors/ConflictError";
import UnprocessableEntityError from "../../errors/UnprocessableEntityError";
import Enterprise from "./Enterprise";

class Employee {
    private _id: number = 0;
    private _nome: string = '';
    private _cpf: string = '';
    private _email: string = '';
    private _endereco: string = '';
    private _empresas: Enterprise[] = [];
    private _idIntegracao: number = 0;

    constructor(nome: string, cpf: string, email: string, endereco: string, idIntegracao: number) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.email = email;
        this._idIntegracao = idIntegracao;
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
        this._nome = nome;
    }

    get cpf() {
        return this._cpf;
    }

    set cpf(cpf: string) {
        this._cpf = cpf;
    }

    get endereco() {
        return this._endereco;
    }

    set endereco(endereco: string) {
        this._endereco = endereco;
    }

    get email() {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get empresas() {
        return this._empresas;
    }

    addEmpresas(empresas: Enterprise) {
        this._empresas.push(empresas);
    }

    get idIntegracao() {
        return this._idIntegracao;
    }

    set idIntegracao(idIntegracao: number) {
        this._idIntegracao = idIntegracao;
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