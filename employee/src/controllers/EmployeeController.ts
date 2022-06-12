import { NextFunction, Request, Response } from "express";
import Employee from "../models/entities/Employee";
import IEmployeeService from "../services/IEmployeeService";
import IEmployeeController from "./IEmployeeController";

class EmployeeController implements IEmployeeController {
    constructor(private employeeService: IEmployeeService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, cpf, email, endereco, empresas } = req.body;
            const employeeCreated = await this.employeeService
                .create({ nome, cpf, email, endereco, empresas });

            res.status(201).json(Employee.toDTO(employeeCreated));
        } catch(err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.employeeService.delete(parseInt(id, 10));
            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nome, cpf, email, endereco, empresas } = req.body;
            const { id } = req.params;
            const employeeUpdated = await this.employeeService
                .update({ id: parseInt(id, 10), nome, cpf, email, endereco, empresas });

            res.status(200).json(Employee.toDTO(employeeUpdated));
        } catch(err) {
            next(err);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const employees = await this.employeeService.findAll();
            res.status(200).json(employees.map((e) => Employee.toDTO(e)));
        } catch(err) {
            next(err);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const employee = await this.employeeService.findById(parseInt(id, 10));
            res.status(200).json(Employee.toDTO(employee));
        } catch(err) {
            next(err);
        }
    }
}

export default EmployeeController;