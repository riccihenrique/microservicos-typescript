import EnterpriseDTO from "../../../DTOs/EnterpriseDTO";
import Enterprise from "../../../models/entities/Enterprise";
import IEnterpriseRepository from "../../../models/repository/IEnterpriseRepository";

class EnterpriseUpdated {
    constructor(private enterpriseRepository: IEnterpriseRepository) { }

    async handle(enterpriseData: EnterpriseDTO) {
        const enterpriseFound = await this.enterpriseRepository.findByCNPJ(enterpriseData.cnpj);
        if(enterpriseFound) {
            const enterprise = new Enterprise(enterpriseData.nome, enterpriseData.cnpj, enterpriseData.endereco, enterpriseData.id as number);
            enterprise.id = enterpriseFound.id;
            await this.enterpriseRepository.update(enterprise);
        }
        else {
            // Escreve no log que não foi possível atualizar pois a empresa não foi cadastrada
        }
    }
}

export default EnterpriseUpdated;