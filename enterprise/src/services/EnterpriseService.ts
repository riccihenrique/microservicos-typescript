import Enterprise from "../models/entities/Enterprise";
import EnterpriseDTO from "../DTOs/EnterpriseDTO";
import EnterpriseRepository from "../models/repository/EnterpriseRepository";
import ConflictError from "../errors/ConflictError";
import IEnterpriseService from "./IEnterpriseService";
import NotFoundError from "../errors/NotFoundError";

class EnterpriseService implements IEnterpriseService {
    constructor(private enterpriseRepository: EnterpriseRepository) { }

    async create(enterpriseData: EnterpriseDTO) {
        const { nome, cnpj, endereco } = enterpriseData;
        const enterprise: Enterprise = new Enterprise(nome, cnpj, endereco);

        /*const enterpriseFound = await this.enterpriseRepository.findByCNPJ(enterprise.cnpj);

        if(enterpriseFound) throw new ConflictError('CNPJ já cadastrado');*/

        const enterpriseCreated = await this.enterpriseRepository.create(enterprise);

        return enterpriseCreated;
    }

    async update(enterpriseData: EnterpriseDTO): Promise<Enterprise> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<void> {
        const enterpriseFound = await this.enterpriseRepository.findById(id);

        if(!enterpriseFound) throw new NotFoundError('Empresa não encontrada');

        await this.enterpriseRepository.delete(id);
    }

    findAll(): Promise<Enterprise[]> {
        return this.enterpriseRepository.findAll();
    }

    async findById(id: number): Promise<Enterprise> {
        const enterpriseFound = await this.enterpriseRepository.findById(id);

        if(!enterpriseFound) if(!enterpriseFound) throw new NotFoundError('Empresa não encontrada');

        return enterpriseFound;
    }
}

export default EnterpriseService;