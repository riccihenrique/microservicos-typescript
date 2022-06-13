import { NextFunction, Request, Response, Router } from 'express';
import EmployeeFactory from '../factories/EmployeeControllerFactory';

const employeeRouter = Router();
const employeeFactory = new EmployeeFactory();

employeeRouter.route('/employees')
.post((req: Request, res: Response, next: NextFunction) => {
    const employeeController = employeeFactory.create();
    employeeController.create(req, res, next);
})
.get((req: Request, res: Response, next: NextFunction) => {
    const employeeController = employeeFactory.create();
    employeeController.findAll(req, res, next);
});

employeeRouter.route('/employees/:id')
.get((req: Request, res: Response, next: NextFunction) => {
    const employeeController = employeeFactory.create();
    employeeController.findById(req, res, next);
})
.delete((req: Request, res: Response, next: NextFunction) => {
    const employeeController = employeeFactory.create();
    employeeController.delete(req, res, next);
})
.put((req: Request, res: Response, next: NextFunction) => {
    const employeeController = employeeFactory.create();
    employeeController.update(req, res, next);
});

export default employeeRouter;