import EnterpriseDTO from "../../DTOs/EnterpriseDTO";
import BadRequestError from "../../errors/BadRequestError";
import UnprocessableEntityError from "../../errors/UnprocessableEntityError";
import CNPJValidator from "../../utils/CNPJValidator";

class Enterprise {
    private _id: number = 0;
    private _nome: string = '';
    private _cnpj: string = '';
    private _endereco: string = '';

    constructor(nome: string, cnpj: string, endereco: string) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.endereco = endereco;
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

    get cnpj() {
        return this._cnpj;
    }

    set cnpj(cnpj: string) {
        if(!cnpj) throw new BadRequestError('CNPJ é obrigatório');

        cnpj = cnpj.replace(/[^\d]+/g, '');
        const cnpjValidator = new CNPJValidator();

        if(!cnpjValidator.validate(cnpj)) throw new UnprocessableEntityError('CNPJ inválido');

        this._cnpj = cnpj;
    }

    get endereco() {
        return this._endereco;
    }

    set endereco(endereco: string) {
        if(!endereco) throw new BadRequestError('Endereço é obrigatório');
        this._endereco = endereco;
    }

    public static toDTO(enterprise: Enterprise) {
        return {
            id: enterprise.id,
            nome: enterprise.nome,
            cnpj: enterprise.cnpj,
            endereco: enterprise.endereco,
        } as EnterpriseDTO
    }
}

export default Enterprise;