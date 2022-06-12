import EnterpriseDTO from "../../../DTOs/EnterpriseDTO";
import Enterprise from "../../../models/entities/Enterprise";
import IEnterpriseRepository from "../../../models/repository/IEnterpriseRepository";

class EnterpriseDeleted {
    constructor(private enterpriseRepository: IEnterpriseRepository) { }

    async handle(enterpriseData: EnterpriseDTO) {
        const enterpriseFound = await this.enterpriseRepository.findByCNPJ(enterpriseData.cnpj);
        if(enterpriseFound) {
            await this.enterpriseRepository.delete(enterpriseFound.id);
        }
        else {
            // Escreve no log que não foi possível deletar pois a empresa não foi cadastrada
        }
    }
}

export default EnterpriseDeleted;