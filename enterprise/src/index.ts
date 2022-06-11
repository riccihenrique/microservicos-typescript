import 'dotenv/config';
import App from './App';

const PORT: string = process.env.PORT || '3000';

const app = new App();
app.listen(PORT);