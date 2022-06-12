import EmployeeViewModel from "./EmployeeViewModel";

type EnterpriseViewModel = {
    id: number;
    nome: string;
    cnpj: string;
    endereco: string;
    funcionarios: EmployeeViewModel[];
}

export default EnterpriseViewModel;