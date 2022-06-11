import { Pool, QueryResult } from 'pg';
import Enterprise from '../entities/Enterprise';
import IEnterpriseRepository from './IEnterpriseRepository';

class EnterpriseRepository implements IEnterpriseRepository{
    constructor(private db: Pool) {}

    async create(enterprise: Enterprise): Promise<Enterprise> {
        const { rows } = await this.db.query<QueryResult>('INSERT INTO enterprises (nome, cnpj, endereco) VALUES ($1, $2, $3) RETURNING *',
            [enterprise.nome, enterprise.cnpj, enterprise.endereco]);
        enterprise.id = (rows[0] as unknown as Enterprise).id;
        return enterprise;
    }

    async findByCNPJ(cnpj: string): Promise<Enterprise | null> {
        const { rows } = await this.db.query<QueryResult>('SELECT * FROM enterprises WHERE cnpj = $1',
            [cnpj]);
        return rows[0] as unknown as Enterprise;
    }

    async update(): Promise<Enterprise> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<Enterprise[]> {
        const { rows } = await this.db.query<QueryResult>('SELECT * FROM enterprises');
        return rows as unknown as Enterprise[];
    }

    async findById(id: number): Promise<Enterprise | null> {
        throw new Error('Method not implemented.');
    }
}

export default EnterpriseRepository;