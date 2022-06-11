import connection from '../models/connection';
import EnterpriseRepository from '../models/repository/EnterpriseRepository';
import EnterpriseService from '../services/EnterpriseService';
import EnterpriseController from '../controllers/EnterpriseController';

class EnterpriseFactory {
    create(): EnterpriseController {
        const enterpriseRepository = new EnterpriseRepository(connection);
        const enterpriseService = new EnterpriseService(enterpriseRepository);
        const enterpriseController = new EnterpriseController(enterpriseService);

        return enterpriseController;
    }
}

export default EnterpriseFactory;