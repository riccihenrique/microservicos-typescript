import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Enterprise from "../models/entities/Enterprise";
import EnterpriseService from "../services/EnterpriseService";
import IEnterpriseController from "./IEnterpriseController";

class EnterpriseController implements IEnterpriseController {
    constructor(private enterpriseService: EnterpriseService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, cnpj, endereco } = req.body;
            const enterpriseCreated = await this.enterpriseService.create({ nome, cnpj, endereco });

            res.status(201).json(Enterprise.toDTO(enterpriseCreated));
        } catch(err) {
            next(err);
        }
    }

    delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const enterprises = await this.enterpriseService.findAll();
            res.status(200).json(enterprises.map((e) => Enterprise.toDTO(e)));
        } catch(err) {
            next(err);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const enterprise = await this.enterpriseService.findById(parseInt(id, 10));
            res.status(200).json(Enterprise.toDTO(enterprise));
        } catch(err) {
            next(err);
        }
    }
}

export default EnterpriseController;