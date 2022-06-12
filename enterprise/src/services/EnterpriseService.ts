import Enterprise from "../models/entities/Enterprise";
import EnterpriseDTO from "../DTOs/EnterpriseDTO";
import ConflictError from "../errors/ConflictError";
import IEnterpriseService from "./IEnterpriseService";
import NotFoundError from "../errors/NotFoundError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import IEnterpriseRepository from "../models/repository/IEnterpriseRepository";
import IBrokerServer from "../broker/server/IBrokerServer";
import { RABBIT_CONFIG } from "../broker/config";

class EnterpriseService implements IEnterpriseService {
    constructor(private enterpriseRepository: IEnterpriseRepository, private messageBroker: IBrokerServer) { }

    async create(enterpriseData: EnterpriseDTO) {
        const { nome, cnpj, endereco } = enterpriseData;
        const enterprise: Enterprise = new Enterprise(nome, cnpj, endereco);

        const enterpriseFound = await this.enterpriseRepository.findByCNPJ(enterprise.cnpj);

        if(enterpriseFound) throw new ConflictError('CNPJ já cadastrado');

        const enterpriseCreated = await this.enterpriseRepository.create(enterprise);
        this.messageBroker.publishInExchange(
            RABBIT_CONFIG.EXCHANGE_NAME,
            RABBIT_CONFIG.ROUTING_KEY_ENTERPRISE_CREATED,
            Enterprise.toDTO(enterpriseCreated)
        );

        return enterpriseCreated;
    }

    async update(enterpriseData: EnterpriseDTO): Promise<Enterprise> {
        const { id, nome, cnpj, endereco } = enterpriseData;

        const enterpriseFound = await this.enterpriseRepository.findById(id as number);

        if(!enterpriseFound)
            throw new NotFoundError('Empresa não encontrada');

        const enterprise: Enterprise = new Enterprise(nome, cnpj, endereco);
        enterprise.id = id as number;

        if(enterprise.cnpj !== enterpriseFound.cnpj)
            throw new UnprocessableEntityError('O CNPJ não pode ser alterado');

        const enterpriseUpdated = await this.enterpriseRepository.update(enterprise);
        this.messageBroker.publishInExchange(
            RABBIT_CONFIG.EXCHANGE_NAME,
            RABBIT_CONFIG.ROUTING_KEY_ENTERPRISE_UPDATED,
            Enterprise.toDTO(enterpriseUpdated)
        );
        return enterpriseUpdated;
    }

    async delete(id: number): Promise<void> {
        const enterpriseFound = await this.enterpriseRepository.findById(id);

        if(!enterpriseFound) throw new NotFoundError('Empresa não encontrada');

        await this.enterpriseRepository.delete(id);
        this.messageBroker.publishInExchange(
            RABBIT_CONFIG.EXCHANGE_NAME,
            RABBIT_CONFIG.ROUTING_KEY_ENTERPRISE_DELETED,
            Enterprise.toDTO(enterpriseFound)
        );
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