import EmployeeDTO from "../DTOs/EmployeeDTO";
import Employee from "../models/entities/Employee";

export default interface IEmployeeService {
    create(employeeData: EmployeeDTO): Promise<Employee>;
    update(employeeData: EmployeeDTO): Promise<Employee>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Employee[]>;
    findById(id: number): Promise<Employee>;
};