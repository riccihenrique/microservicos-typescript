import EnterpriseDTO from "../DTOs/EnterpriseDTO";
import Enterprise from "../models/entities/Enterprise";

export default interface IEnterpriseService {
    create(enterpriseData: EnterpriseDTO): Promise<Enterprise>;
    update(enterpriseData: EnterpriseDTO): Promise<Enterprise>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Enterprise[]>;
    findById(id: number): Promise<Enterprise>;
};