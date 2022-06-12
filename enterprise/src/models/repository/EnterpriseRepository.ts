import { Pool, QueryResult } from 'pg';
import EmployeeDTO from '../../DTOs/EmployeeDTO';
import EnterpriseDTO from '../../DTOs/EnterpriseDTO';
import EmployeeFactory from '../../factories/EmployeeFactory';
import EnterpriseFactory from '../../factories/EnterpriseFactory';
import Enterprise from '../entities/Enterprise';
import IEnterpriseRepository from './IEnterpriseRepository';

class EnterpriseRepository implements IEnterpriseRepository{
    constructor(private db: Pool) {}

    async create(enterprise: Enterprise): Promise<Enterprise> {
        const { rows } = await this.db.query<QueryResult>(
            'INSERT INTO enterprises (nome, cnpj, endereco) VALUES ($1, $2, $3) RETURNING *',
            [enterprise.nome, enterprise.cnpj, enterprise.endereco]
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
        await this.db.query<QueryResult>('DELETE FROM enterprises WHERE id = $1', [id]);
    }

    async findAll(): Promise<Enterprise[]> {
        const { rows } = await this.db.query<QueryResult>('SELECT * FROM enterprises');

        const enterprises: Enterprise[] = [];
        for(let row of rows) {
            let enterprise =new EnterpriseFactory().create(row as unknown as EnterpriseDTO);
            enterprise = await this.addEmployeeInfo(enterprise);
            enterprises.push(enterprise);
        }

        return enterprises;
    }

    async findById(id: number): Promise<Enterprise | null> {
        const { rows } = await this.db.query<QueryResult>(
            'SELECT * FROM enterprises WHERE id = $1',
            [id]
        );

        if(!rows[0]) return null;

        let enterprise = new EnterpriseFactory().create(rows[0] as unknown as EnterpriseDTO);
        enterprise = await this.addEmployeeInfo(enterprise);

        return enterprise;
    }

    private async addEmployeeInfo(enterprise: Enterprise): Promise<Enterprise> {
        const result = await this.db.query<QueryResult>(
            `SELECT emp.*
            FROM employees emp
            INNER JOIN employee_enterprise ee ON emp.id = ee.employee_id
            WHERE ee.enterprise_id = $1`,
            [enterprise.id]
        );

        for(let employee of result.rows) {
            enterprise.addFuncionario(new EmployeeFactory().create(employee as unknown as EmployeeDTO));
        }

        return enterprise;
    }
}

export default EnterpriseRepository;