import express, { NextFunction, Request, Response } from 'express';
import RabbitMQSetup from './broker/RabbitMQSetup';
import EnterpriseController from './controllers/EnterpriseController';
import ErrorBase from './errors/ErrorBase';
import EnterpriseControllerFactory from './factories/EnterpriseControllerFactory';
import EnterpriseRouter from './routes/EnterpriseRouter';
import enterpriseRouter from './routes/EnterpriseRouter';

class App {
    private app;
    constructor() {
      this.app = express();

      this.middlewares();
      this.routes();
      this.errorMiddleware();
    }

    listen(port: string) {
      this.app.listen(port, async () => {
        await RabbitMQSetup.init();
        console.log(`Running on ${port} port.`);
      });
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
        this.app.use(new EnterpriseRouter(new EnterpriseControllerFactory()).enterpriseRouter);
    }

    getExpressApp() {
      return this.app;
    }
}

export default App;