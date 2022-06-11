import Employee from "../entities/Employee";

export default interface IEmployeeRepository {
    create(employee: Employee): Promise<Employee>;
    update(employee: Employee): Promise<Employee>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Employee[]>;
    findById(id: number): Promise<Employee | null>;
    findByCPF(cpf: string): Promise<Employee | null>;
}