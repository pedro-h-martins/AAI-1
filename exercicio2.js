const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class FaixaEtariaContador {
    constructor() {
        this.contadores = {
            "Criança (0-12)": 0,
            "Adolescente (13-17)": 0,
            "Adulto (18-59)": 0,
            "Idoso (60+)": 0
        };
    }

    adicionarIdade(idade) {
        if (idade >= 0 && idade <= 12) {
            this.contadores["Criança (0-12)"]++
        } else if (idade >= 13 && idade <= 17) {
            this.contadores["Adolescente (13-17)"]++
        } else if (idade >= 18 && idade <= 59) {
            this.contadores["Adulto (18-59)"]++
        } else if (idade >= 60) {
            this.contadores["Idoso (60+)"]++
        } else {
            console.log("Idade inválida!")
        }
    };

    mostrarContagem() {
        console.log("\nContagem por Faixa Etária:")
        Object.entries(this.contadores).forEach(([faixa, quantidade]) => {
            console.log(`${faixa}: ${quantidade}`)
        })
    };
};

const contador = new FaixaEtariaContador()

function solicitarIdade() {
    rl.question("Digite a idade (ou 'N' para finalizar): ", (entrada) => {
        if (entrada.toUpperCase() === "N") {
            contador.mostrarContagem()
            rl.close();
        } else {
            let idade = parseInt(entrada);
            if (!isNaN(idade) && idade >= 0) {
                contador.adicionarIdade(idade)
                solicitarIdade()
            } else {
                console.log("Por favor, insira uma idade válida.")
                solicitarIdade()
            };
        };
    })
};

solicitarIdade();
