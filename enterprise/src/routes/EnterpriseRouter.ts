import { NextFunction, Request, Response, Router } from 'express';
import EnterpriseControllerFactory from '../factories/EnterpriseControllerFactory';

class EnterpriseRouter {
    private _enterpriseRouter = Router();
    constructor(private enterpriseFactory: EnterpriseControllerFactory) {
        this.defineRoutes();
    }

    private defineRoutes() {
        this._enterpriseRouter.route('/enterprises')
        .post((req: Request, res: Response, next: NextFunction) => {
            const enterpriseController = this.enterpriseFactory.create();
            enterpriseController.create(req, res, next);
        })
        .get((req: Request, res: Response, next: NextFunction) => {
            const enterpriseController = this.enterpriseFactory.create();
            enterpriseController.findAll(req, res, next);
        });

        this._enterpriseRouter.route('/enterprises/:id')
        .get((req: Request, res: Response, next: NextFunction) => {
            const enterpriseController = this.enterpriseFactory.create();
            enterpriseController.findById(req, res, next);
        })
        .delete((req: Request, res: Response, next: NextFunction) => {
            const enterpriseController = this.enterpriseFactory.create();
            enterpriseController.delete(req, res, next);
        })
        .put((req: Request, res: Response, next: NextFunction) => {
            const enterpriseController = this.enterpriseFactory.create();
            enterpriseController.update(req, res, next);
        });
    }

    get enterpriseRouter() {
        return this._enterpriseRouter;
    }
}

export default EnterpriseRouter;