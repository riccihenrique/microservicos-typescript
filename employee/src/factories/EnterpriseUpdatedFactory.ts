import connection from '../models/connection';
import EnterpriseUpdated from '../events/handles/enterprise/EnterpriseUpdated';
import EnterpriseRepository from '../models/repository/EnterpriseRepository';

class EnterpriseUpdatedFactory {
    create(): EnterpriseUpdated {
        const enterpriseRepository = new EnterpriseRepository(connection);
        return new EnterpriseUpdated(enterpriseRepository);
    }
}

export default EnterpriseUpdatedFactory;