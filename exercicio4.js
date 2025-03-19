const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularValorHora(salarioMinimo, turno, categoria) {
    let percentual;

    turno = turno.toUpperCase();
    categoria = categoria.toUpperCase();
    
    switch (true) {
        case (categoria === 'F' && turno === 'M'): percentual = 0.10; break;
        case (categoria === 'F' && turno === 'V'): percentual = 0.15; break;
        case (categoria === 'F' && turno === 'N'): percentual = 0.20; break;
        case (categoria === 'G' && turno === 'M'): percentual = 0.30; break;
        case (categoria === 'G' && turno === 'V'): percentual = 0.35; break;
        case (categoria === 'G' && turno === 'N'): percentual = 0.40; break;
        default: return 0;
    }
    
    return (percentual * salarioMinimo);
};

function calcularAuxilioAlimentacao(salarioInicial) {
    if (salarioInicial <= 800) {
        return salarioInicial * 0.25;
    } else if (salarioInicial <= 1200) {
        return salarioInicial * 0.20;
    } else {
        return salarioInicial * 0.15;
    }
};

function pergunta(questao) {
    return new Promise(resolve => rl.question(questao, resolve));
};

async function processarFuncionario() {
    console.log('\n=== Cadastro do Funcionário ===');
    
    const salarioMinimo = parseFloat(await pergunta('Digite o valor do salário mínimo: '));
    const codigo = await pergunta('Digite o código do funcionário: ');
    const horasTrabalhadas = parseInt(await pergunta('Digite o número de horas trabalhadas: '));
    const turno = await pergunta('Digite o turno (M/V/N): ');
    const categoria = await pergunta('Digite a categoria (F/G): ');
    const valorHora = calcularValorHora(salarioMinimo, turno, categoria);
    const salarioInicial = valorHora * horasTrabalhadas;
    const auxilioAlimentacao = calcularAuxilioAlimentacao(salarioInicial);
    const salarioFinal = salarioInicial + auxilioAlimentacao;

    console.log('\n=== Informações do Funcionário ===');
    console.log(`Código: ${codigo}`);
    console.log(`Horas trabalhadas: ${horasTrabalhadas}`);
    console.log(`Turno: ${turno}`);
    console.log(`Categoria: ${categoria}`);
    console.log(`Valor da hora: R$ ${valorHora.toFixed(2)}`);
    console.log(`Salário inicial: R$ ${salarioInicial.toFixed(2)}`);
    console.log(`Auxílio alimentação: R$ ${auxilioAlimentacao.toFixed(2)}`);
    console.log(`Salário final: R$ ${salarioFinal.toFixed(2)}`);

    const continuar = await pergunta('\nDeseja cadastrar outro funcionário? (S/N): ');
    return continuar.toUpperCase() === 'S';
};

async function main() {
    let continuar = true;
    while (continuar) {
        continuar = await processarFuncionario();
    }
    rl.close();
};

main();
