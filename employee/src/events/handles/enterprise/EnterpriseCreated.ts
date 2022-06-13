import EnterpriseDTO from "../../../DTOs/EnterpriseDTO";
import Enterprise from "../../../models/entities/Enterprise";
import IEnterpriseRepository from "../../../models/repository/IEnterpriseRepository";

class EnterpriseCreated {
    constructor(private enterpriseRepository: IEnterpriseRepository) { }

    async handle(enterpriseData: EnterpriseDTO): Promise<void> {
        const enterpriseFound = await this.enterpriseRepository.findByCNPJ(enterpriseData.cnpj);
        if(!enterpriseFound) {
            const enterprise = new Enterprise(enterpriseData.nome, enterpriseData.cnpj, enterpriseData.endereco, enterpriseData.id as number);
            await this.enterpriseRepository.create(enterprise);
        }
    }
}

export default EnterpriseCreated;