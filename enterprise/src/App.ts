import express, { NextFunction, Request, Response } from 'express';
import ErrorBase from './errors/ErrorBase';
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
      this.app.listen(port, () => console.log(`Running on ${port} port.`));
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
        res.status(500).json({ message: 'Internal error' });
      });
    }

    private routes() {
        // app.get('/', (req, res) => res.send('oi'));
        this.app.use(enterpriseRouter);
        this.app.use('dsdasd/', (req, res) => res.send('dasd'));
    }
}

export default App;