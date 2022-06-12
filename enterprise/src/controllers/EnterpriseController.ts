import { NextFunction, Request, Response } from "express";
import Enterprise from "../models/entities/Enterprise";
import IEnterpriseService from "../services/IEnterpriseService";
import IEnterpriseController from "./IEnterpriseController";

class EnterpriseController implements IEnterpriseController {
    constructor(private enterpriseService: IEnterpriseService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, cnpj, endereco } = req.body;
            const enterpriseCreated = await this.enterpriseService
                .create({ nome, cnpj, endereco });

            res.status(201).json(Enterprise.toViewModel(enterpriseCreated));
        } catch(err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.enterpriseService.delete(parseInt(id, 10));
            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nome, cnpj, endereco } = req.body;
            const { id } = req.params;
            const enterpriseUpdated = await this.enterpriseService
                .update({ id: parseInt(id, 10), nome, cnpj, endereco });

            res.status(200).json(Enterprise.toViewModel(enterpriseUpdated));
        } catch(err) {
            next(err);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const enterprises = await this.enterpriseService.findAll();
            res.status(200).json(enterprises.map((e) => Enterprise.toViewModel(e)));
        } catch(err) {
            next(err);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const enterprise = await this.enterpriseService.findById(parseInt(id, 10));
            res.status(200).json(Enterprise.toViewModel(enterprise));
        } catch(err) {
            next(err);
        }
    }
}

export default EnterpriseController;