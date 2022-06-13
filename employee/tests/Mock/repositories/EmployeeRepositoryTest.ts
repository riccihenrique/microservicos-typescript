import Employee from "../../../src/models/entities/Employee";
import IEmployeeRepository from "../../../src/models/repository/IEmployeeRepository";

class EmployeeRepositoryTest implements IEmployeeRepository {
    create(employee: Employee): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    update(employee: Employee): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Employee[]> {
        return [];
    }
    findById(id: number): Promise<Employee | null> {
        throw new Error("Method not implemented.");
    }
    findByCPF(cpf: string): Promise<Employee | null> {
        throw new Error("Method not implemented.");
    }
}

export default EmployeeRepositoryTest;