import Enterprise from "../entities/Enterprise";

export default interface IEnterpriseRepository {
    create(enterprise: Enterprise): Promise<Enterprise>;
    update(enterprise: Enterprise): Promise<Enterprise>;
    delete(id: number): Promise<void>;
    findByCNPJ(cnpj: string): Promise<Enterprise | null>;
}