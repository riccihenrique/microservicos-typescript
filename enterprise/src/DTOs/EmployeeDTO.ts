type EmployeeDTO = {
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    endereco: string;
    empresas?: string[];
};

export default EmployeeDTO;