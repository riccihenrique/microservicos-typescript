import { NextFunction, Request, Response, Router } from 'express';
import EnterpriseControllerFactory from '../factories/EnterpriseControllerFactory';

const enterpriseRouter = Router();
const enterpriseFactory = new EnterpriseControllerFactory();

enterpriseRouter.route('/enterprises')
.post((req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.create(req, res, next);
})
.get((req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.findAll(req, res, next);
});

enterpriseRouter.route('/enterprises/:id')
.get((req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.findById(req, res, next);
})
.delete((req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.delete(req, res, next);
})
.put((req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.update(req, res, next);
});

export default enterpriseRouter;