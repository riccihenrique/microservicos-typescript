import Enterprise from "../../../src/models/entities/Enterprise";
import IEnterpriseRepository from "../../../src/models/repository/IEnterpriseRepository";

class EnterpriseRepositoryTest implements IEnterpriseRepository {
    create(enterprise: Enterprise): Promise<Enterprise> {
        throw new Error("Method not implemented.");
    }
    update(enterprise: Enterprise): Promise<Enterprise> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Enterprise[]> {
        throw new Error('Erro proposital');
    }
    findById(id: number): Promise<Enterprise | null> {
        throw new Error("Method not implemented.");
    }
    findByCNPJ(cnpj: string): Promise<Enterprise | null> {
        throw new Error("Method not implemented.");
    }

}

export default EnterpriseRepositoryTest;