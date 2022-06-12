import connection from '../models/connection';
import EnterpriseCreated from '../events/handles/employee/EnterpriseCreated';
import EnterpriseRepository from '../models/repository/EnterpriseRepository';

class EnterpriseCreatedFactory {
    create(): EnterpriseCreated {
        const enterpriseRepository = new EnterpriseRepository(connection);
        return new EnterpriseCreated(enterpriseRepository);
    }
}

export default EnterpriseCreatedFactory;