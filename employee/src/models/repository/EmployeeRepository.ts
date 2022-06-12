import { Pool, QueryResult } from 'pg';
import Employee from '../entities/Employee';
import Enterprise from '../entities/Enterprise';
import IEmployeeRepository from './IEmployeeRepository';

class EmployeeRepository implements IEmployeeRepository{
    constructor(private db: Pool) {}

    async create(employee: Employee): Promise<Employee> {
        const { rows } = await this.db.query<QueryResult>(
            'INSERT INTO employees (nome, cpf, email, endereco) VALUES ($1, $2, $3, $4) RETURNING *',
            [employee.nome, employee.cpf, employee.email, employee.endereco]
        );
        employee.id = (rows[0] as unknown as Employee).id;

        await this.insertEmployeEnterprises(employee);

        return employee;
    }

    async findByCPF(cpf: string): Promise<Employee | null> {
        const { rows } = await this.db.query<QueryResult>(
            'SELECT * FROM employees WHERE cpf = $1',
            [cpf]
        );
        return rows[0] as unknown as Employee;
    }

    async update(employee: Employee): Promise<Employee> {
        await this.db.query('DELETE FROM employee_enterprise WHERE employee_id = $1', [employee.id]);

        await this.db.query<QueryResult>(
            'UPDATE employees SET nome = $1, email = $2, endereco = $3 WHERE id = $4 RETURNING *',
            [employee.nome, employee.email, employee.endereco, employee.id]
        );

        await this.insertEmployeEnterprises(employee);
        return employee;
    }

    async delete(id: number): Promise<void> {
        await this.db.query('DELETE FROM employee_enterprise WHERE employee_id = $1', [id]);
        await this.db.query<QueryResult>('DELETE FROM employees WHERE id = $1', [id]);
    }

    async findAll(): Promise<Employee[]> {
        const { rows } = await this.db.query<QueryResult>('SELECT * FROM employees');
        return rows as unknown as Employee[];
    }

    async findById(id: number): Promise<Employee | null> {
        const { rows } = await this.db.query<QueryResult>(
            'SELECT * FROM employees WHERE id = $1',
            [id]
        );
        return rows[0] as unknown as Employee;
    }

    private async insertEmployeEnterprises(employee: Employee) {
        for(let enterprise of employee.empresas) {
            await this.db.query<QueryResult>(
                'INSERT INTO employee_enterprise (enterprise_id, employee_id) VALUES ($1, $2)',
                [enterprise.id, employee.id]
            );
        }
    }
}

export default EmployeeRepository;