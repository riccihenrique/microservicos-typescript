import connection from '../models/connection';
import EnterpriseRepository from '../models/repository/EnterpriseRepository';
import EnterpriseService from '../services/EnterpriseService';
import EnterpriseController from '../controllers/EnterpriseController';
import RabbitMQServer from '../broker/server/RabbitmqServer';

class EnterpriseControllerFactory {
    create(): EnterpriseController {
        const enterpriseRepository = new EnterpriseRepository(connection);
        const enterpriseService = new EnterpriseService(enterpriseRepository, RabbitMQServer.getInstance());
        const enterpriseController = new EnterpriseController(enterpriseService);

        return enterpriseController;
    }
}

export default EnterpriseControllerFactory;