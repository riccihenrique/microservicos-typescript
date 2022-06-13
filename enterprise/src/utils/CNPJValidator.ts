class CNPJValidator {
    validate(cnpj: string): boolean {
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        if(this.check_equal_numbers(cnpj)) return false;

        for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0)))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(1)))
            return false;

        return true;
    }

    private check_equal_numbers(cnpf: string): boolean {
        return (
            cnpf === '0000000000000' ||
            cnpf === '1111111111111' ||
            cnpf === '2222222222222' ||
            cnpf === '3333333333333' ||
            cnpf === '4444444444444' ||
            cnpf === '5555555555555' ||
            cnpf === '6666666666666' ||
            cnpf === '7777777777777' ||
            cnpf === '8888888888888' ||
            cnpf === '9999999999999'
        );
    }
}

export default CNPJValidator;