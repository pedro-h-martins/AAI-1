const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularIMC() {
rl.question('Digite seu peso (kg): ', (peso) => {
    rl.question('Digite sua altura (m): ', (altura) => {
        const imc = peso / (altura * altura)
        let classificacao = ''

        if (imc < 16) {
            classificacao = 'Baixo peso muito grave'
        } else if (imc >= 16 && imc < 17) {
            classificacao = 'Baixo peso grave'
        } else if (imc >= 17 && imc < 18.5) {
            classificacao = 'Baixo peso'
        } else if (imc >= 18.5 && imc < 25) {
            classificacao = 'Peso normal'
        } else if (imc >= 25 && imc < 30) {
            classificacao = 'Sobrepeso'
        } else if (imc >= 30 && imc < 35) {
            classificacao = 'Obesidade grau I'
        } else if (imc >= 35 && imc < 40) {
            classificacao = 'Obesidade grau II'
        } else {
            classificacao = 'Obesidade grau III'
        }

        console.log(`\nSeu IMC é: ${imc.toFixed(2)}`)
        console.log(`Classificação: ${classificacao}`)

        perguntarContinuar()
    });
});
};

function perguntarContinuar() {
    rl.question('\nDeseja calcular outro IMC? (S/N): ', (resposta) => {
        if (resposta.toUpperCase() === 'S') {
            console.log('\n-------------------')
            calcularIMC()
        } else {
            rl.close()
    }
});
};

console.log('Calculadora de IMC');
console.log('-------------------');
calcularIMC();