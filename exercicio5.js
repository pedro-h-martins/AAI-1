const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function classificarNota(media) {
    if (media > 9 && media <= 10) return 'A';
    if (media > 8 && media <= 9) return 'B';
    if (media > 7 && media <= 8) return 'C';
    if (media > 6 && media <= 7) return 'D';
    if (media > 5 && media <= 6) return 'E';
    return 'F';
};

function calcularMedia(nota1, nota2, nota3) {
    const peso1 = 2, peso2 = 5, peso3 = 3;
    const somaPesos = peso1 + peso2 + peso3;
    return ((peso1 * nota1) + (peso2 * nota2) + (peso3 * nota3)) / somaPesos;
};

function solicitarNotas() {
    rl.question('Digite a nota da Atividade Prática (0-10): ', (nota1) => {
        rl.question('Digite a nota da Prova do Semestre (0-10): ', (nota2) => {
            rl.question('Digite a nota do Trabalho Teórico (0-10): ', (nota3) => {
                const media = calcularMedia(parseFloat(nota1), parseFloat(nota2), parseFloat(nota3));
                const classificacao = classificarNota(media);
                
                console.log(`A média do aluno é = ${media.toFixed(2)} e sua classificação é ${classificacao}`);
                
                rl.question('Deseja calcular para outro aluno? (S/N): ', (resposta) => {
                    if (resposta.toUpperCase() === 'S') {
                        solicitarNotas();
                    } else {
                        rl.close();
                    }
                });
            });
        });
    });
};

console.log('Calculadora de Média Ponderada');
solicitarNotas();
