CREATE TABLE IF NOT EXISTS  enterprises (
	id SERIAL NOT NULL PRIMARY KEY,
	nome varchar(100) NOT NULL,
	cnpj varchar(14) NOT NULL,
	endereco varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS  employees (
	id SERIAL NOT NULL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	email VARCHAR(50) NOT NULL,
	endereco VARCHAR(200) NOT NULL,
	id_integracao INT
);

CREATE TABLE IF NOT EXISTS  employee_enterprise (
	enterprise_id INT NOT NULL,
	employee_id INT NOT NULL,
    CONSTRAINT pk_employee_enterprise PRIMARY KEY (enterprise_id, employee_id),
    CONSTRAINT fk_enterprise_id FOREIGN KEY (enterprise_id) REFERENCES enterprises(id),
    CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(id)
);