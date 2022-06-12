import connection from '../models/connection';
import EnterpriseRepository from '../models/repository/EnterpriseRepository';
import EnterpriseDeleted from '../events/handles/enterprise/EnterpriseDeleted';

class EnterpriseDeletedFactory {
    create(): EnterpriseDeleted {
        const enterpriseRepository = new EnterpriseRepository(connection);
        return new EnterpriseDeleted(enterpriseRepository);
    }
}

export default EnterpriseDeletedFactory;