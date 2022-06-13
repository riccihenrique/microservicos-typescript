import express, { NextFunction, Request, Response } from 'express';
import ErrorBase from '../../src/errors/ErrorBase';
import EnterpiseRouter from '../../src/routes/EnterpriseRouter';
import EnterpriseControllerFactoryTest from './factories/EnterpriseControllerFactoryTest';

class App {
    private app;

    constructor() {
      this.app = express();

      this.middlewares();
      this.routes();
      this.errorMiddleware();
    }

    private middlewares() {
        this.app.use(express.json());
    }

    private errorMiddleware() {
      this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if(err instanceof ErrorBase) {
          return res.status(err.stausCode).json({ message: err.message });
        }
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
      });
    }

    private routes() {
      this.app.use(new EnterpiseRouter(new EnterpriseControllerFactoryTest()).enterpriseRouter);
    }

    getExpressApp() {
      return this.app;
    }
}

export default App;