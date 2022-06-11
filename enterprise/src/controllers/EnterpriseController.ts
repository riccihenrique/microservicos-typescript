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
        }
        catch(err) {
            next(err);
        }
    }

    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default EnterpriseController;