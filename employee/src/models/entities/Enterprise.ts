import EnterpriseDTO from "../../DTOs/EnterpriseDTO";
import EnterpriseViewModel from "../../viewModels/EnterpriseViewModel";

class Enterprise {
    private _id: number = 0;
    private _nome: string = '';
    private _cnpj: string = '';
    private _endereco: string = '';
    private _idIntegracao: number = 0;

    constructor(nome: string, cnpj: string, endereco: string, idIntegracao: number) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.endereco = endereco;
        this.idIntegracao = idIntegracao;
    }

    get idIntegracao() {
        return this._idIntegracao;
    }

    set idIntegracao(idIntegracao: number) {
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

    get cnpj() {
        return this._cnpj;
    }

    set cnpj(cnpj: string) {
        this._cnpj = cnpj;
    }

    get endereco() {
        return this._endereco;
    }

    set endereco(endereco: string) {
        this._endereco = endereco;
    }

    public static toDTO(enterprise: Enterprise) {
        return {
            id: enterprise.id,
            nome: enterprise.nome,
            cnpj: enterprise.cnpj,
            endereco: enterprise.endereco,
        };
    }

    public static toViewModel(enterprise: Enterprise): EnterpriseViewModel {
        return {
            id: enterprise.id,
            nome: enterprise.nome,
            cnpj: enterprise.cnpj,
            endereco: enterprise.endereco,
        };
    }
}

export default Enterprise;