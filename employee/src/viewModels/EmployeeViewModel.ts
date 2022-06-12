import EnterpriseViewModel from "./EnterpriseViewModel";

type EmployeeViewModel = {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    endereco: string;
    empresas: EnterpriseViewModel[];
}

export default EmployeeViewModel;