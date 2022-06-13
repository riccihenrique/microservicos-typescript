import { NextFunction, Request, Response, Router } from 'express';
import EmployeeFactory from '../factories/EmployeeControllerFactory';
class EmployeeRouter {
    private _employeeRouter: Router = Router();
    constructor(private employeeFactory: EmployeeFactory) { 
        this.defineRoutes();
    }

    private defineRoutes() {
        this._employeeRouter.route('/employees')
        .post((req: Request, res: Response, next: NextFunction) => {
            const employeeController = this.employeeFactory.create();
            employeeController.create(req, res, next);
        })
        .get((req: Request, res: Response, next: NextFunction) => {
            const employeeController = this.employeeFactory.create();
            employeeController.findAll(req, res, next);
        });

        this._employeeRouter.route('/employees/:id')
        .get((req: Request, res: Response, next: NextFunction) => {
            const employeeController = this.employeeFactory.create();
            employeeController.findById(req, res, next);
        })
        .delete((req: Request, res: Response, next: NextFunction) => {
            const employeeController = this.employeeFactory.create();
            employeeController.delete(req, res, next);
        })
        .put((req: Request, res: Response, next: NextFunction) => {
            const employeeController = this.employeeFactory.create();
            employeeController.update(req, res, next);
        });
    }

    get employeeRouter() {
        return this._employeeRouter;
    }
}

export default EmployeeRouter;