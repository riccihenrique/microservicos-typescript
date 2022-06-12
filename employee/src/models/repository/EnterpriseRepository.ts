import { Pool, QueryResult } from 'pg';
import Enterprise from '../entities/Enterprise';
import IEnterpriseRepository from './IEnterpriseRepository';

class EnterpriseRepository implements IEnterpriseRepository{
    constructor(private db: Pool) {}

    async create(enterprise: Enterprise): Promise<Enterprise> {
        const { rows } = await this.db.query<QueryResult>(
            'INSERT INTO enterprises (nome, cnpj, endereco, id_integracao) VALUES ($1, $2, $3, $4) RETURNING *',
            [enterprise.nome, enterprise.cnpj, enterprise.endereco, enterprise.idIntegracao]
        );
        enterprise.id = (rows[0] as unknown as Enterprise).id;
        return enterprise;
    }

    async findByCNPJ(cnpj: string): Promise<Enterprise | null> {
        const { rows } = await this.db.query<QueryResult>(
            'SELECT * FROM enterprises WHERE cnpj = $1',
            [cnpj]
        );
        return rows[0] as unknown as Enterprise;
    }

    async update(enterprise: Enterprise): Promise<Enterprise> {
        await this.db.query<QueryResult>(
            'UPDATE enterprises SET nome = $1, endereco = $2 WHERE id = $3 RETURNING *',
            [enterprise.nome, enterprise.endereco, enterprise.id]
        );
        return enterprise;
    }

    async delete(id: number): Promise<void> {
        await this.db.query<QueryResult>(
            'DELETE FROM employee_enterprise WHERE enterprise_id = $1',
            [id]
        );
        await this.db.query<QueryResult>('DELETE FROM enterprises WHERE id = $1', [id]);
    }
}

export default EnterpriseRepository;