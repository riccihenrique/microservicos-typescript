import { NextFunction, Request, Response, Router } from 'express';
import EnterpriseFactory from '../factories/EnterpriseFactory';

const enterpriseRouter = Router();
const enterpriseFactory = new EnterpriseFactory();

enterpriseRouter.post('/enterprise', (req: Request, res: Response, next: NextFunction) => {
    const enterpriseController = enterpriseFactory.create();
    enterpriseController.create(req, res, next);
});

export default enterpriseRouter;