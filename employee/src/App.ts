import express, { NextFunction, Request, Response } from 'express';
import RabbitMQSetup from './broker/RabbitMQSetup';
import ErrorBase from './errors/ErrorBase';
import employeeRouter from './routes/EmployeeRouter';

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
        RabbitMQSetup.init();
        console.log(`Running on ${port} port.`)}
      );
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
      this.app.use(employeeRouter);
    }
}

export default App;