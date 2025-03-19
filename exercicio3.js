const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function calcularFrete() {
    const disInput = await perguntar("Informe a distância (em km) que a carga percorrerá: ");
    const dis = parseFloat(disInput);
    
    const pecasInput = await perguntar("Informe a quantidade de peças a serem transportadas: ");
    const pecas = parseInt(pecasInput);
    
    let regiao = await perguntar("Informe a região de destino (1: Sudeste, 2: Sul, 3: Centro-Oeste): ");
    
    while (regiao !== '1' && regiao !== '2' && regiao !== '3') {
        regiao = await perguntar("Região inválida! Informe a região de destino corretamente (1: Sudeste, 2: Sul, 3: Centro-Oeste): ");
    }
    
    const rastreamentoInput = await perguntar("Deseja rastreamento do pedido? (S/N): ");
    const rastreamento = rastreamentoInput.toUpperCase() === 'S';
    
    let valorPorPeca;
    switch (regiao) {
        case '1':
            valorPorPeca = 1.20; 
            break;
        case '2':
            valorPorPeca = 1.30; 
            break;
        case '3':
            valorPorPeca = 1.50; 
            break;
    }

    let valorPecas = pecas * valorPorPeca;

    if (pecas > 1000) {
        const pecasComDesconto = pecas - 1000
        const valorDesconto = pecasComDesconto * valorPorPeca * 0.12
        valorPecas -= valorDesconto
    }

    const valorKm = dis * 6.14
    const taxaRastreamento = rastreamento ? 200 : 0
    const totalFrete = valorPecas + valorKm + taxaRastreamento;

    console.log("\n=== Cálculo do Frete ===")
    if (rastreamento) {
        console.log("Taxa de rastreamento: R$ 200,00")
    }
    console.log(`Valor do frete pelas peças transportadas: R$ ${valorPecas.toFixed(2)}`)
    console.log(`Valor do frete por quilômetro percorrido: R$ ${valorKm.toFixed(2)}`)
    console.log(`Total do frete: R$ ${totalFrete.toFixed(2)}`)

    rl.close()
}

calcularFrete();
