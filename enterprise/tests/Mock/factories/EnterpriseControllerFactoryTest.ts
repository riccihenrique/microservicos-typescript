import EnterpriseService from '../../../src/services/EnterpriseService';
import EnterpriseController from '../../../src/controllers/EnterpriseController';
import BrokerServerTest from '../broker/BrokerServerTest';
import EnterpriseRepositoryTest from '../repositories/EnterpriseRepositoryTest';

class EnterpriseControllerFactoryTest {
    create(): EnterpriseController {
        const enterpriseRepository = new EnterpriseRepositoryTest();
        const enterpriseService = new EnterpriseService(enterpriseRepository, new BrokerServerTest());
        const enterpriseController = new EnterpriseController(enterpriseService);

        return enterpriseController;
    }
}

export default EnterpriseControllerFactoryTest;