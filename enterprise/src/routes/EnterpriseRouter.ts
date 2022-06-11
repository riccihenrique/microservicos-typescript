import { NextFunction, Request, Response, Router } from 'express';
import EnterpriseFactory from '../factories/EnterpriseFactory';

const enterpriseRouter = Router();
const enterpriseFactory = new EnterpriseFactory();

enterpriseRouter.post('/enterprise', (req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.create(req, res, next);
});

enterpriseRouter.get('/enterprise', (req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.findAll(req, res, next);
});

enterpriseRouter.get('/enterprise/:id', (req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.findById(req, res, next);
});

enterpriseRouter.delete('/enterprise/:id', (req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.delete(req, res, next);
});

enterpriseRouter.put('/enterprise/:id', (req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.update(req, res, next);
});

export default enterpriseRouter;