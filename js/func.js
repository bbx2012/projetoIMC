
const dadosUsuarios = [];


function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


function determinarCondicao(imc, sexo) {
    if (sexo === 'feminino') {
        if (imc < 19.1) return { condicao: 'abaixo do peso', limiteSuperior: 19.1 };
        if (imc <= 25.8) return { condicao: 'no peso normal', limiteSuperior: 25.8 };
        if (imc <= 27.3) return { condicao: 'marginalmente acima do peso', limiteSuperior: 27.3 };
        if (imc <= 32.3) return { condicao: 'acima do peso ideal', limiteSuperior: 32.3 };
        return { condicao: 'obeso', limiteSuperior: Infinity };
    } else {
        if (imc < 20.7) return { condicao: 'abaixo do peso', limiteSuperior: 20.7 };
        if (imc <= 26.4) return { condicao: 'no peso normal', limiteSuperior: 26.4 };
        if (imc <= 27.8) return { condicao: 'marginalmente acima do peso', limiteSuperior: 27.8 };
        if (imc <= 31.1) return { condicao: 'acima do peso ideal', limiteSuperior: 31.1 };
        return { condicao: 'obeso', limiteSuperior: Infinity };
    }
}

function calcularDiferencaPeso(imc, altura, sexo, condicaoInfo) {
    if (condicaoInfo.condicao === 'no peso normal') {
        return 0; 
    }
    
    const imcAlvo = sexo === 'feminino' ? (19.1 + 25.8) / 2 : (20.7 + 26.4) / 2;
    const pesoAlvo = imcAlvo * (altura * altura);
    const pesoAtual = imc * (altura * altura);
    
    return pesoAlvo - pesoAtual;
}


function formatarDiferencaPeso(diferenca) {
    if (diferenca === 0) return "Você está no peso normal";
    
    const absDiferenca = Math.abs(diferenca);
    const texto = diferenca > 0 ? "ganhar" : "perder";
    
    return `Você precisa ${texto} ${absDiferenca.toFixed(1)} kg para atingir o peso normal`;
}


function getStatusClass(condicao) {
    switch(condicao) {
        case 'abaixo do peso': return 'status-abaixo';
        case 'no peso normal': return 'status-normal';
        case 'marginalmente acima do peso': return 'status-marginal';
        case 'acima do peso ideal': return 'status-acima';
        case 'obeso': return 'status-obeso';
        default: return '';
    }
}


function exibirResultados() {
    const listaResultados = document.getElementById('listaResultados');
    listaResultados.innerHTML = '';
    
    dadosUsuarios.forEach(usuario => {
        const resultadoItem = document.createElement('div');
        resultadoItem.className = `resultado-item ${getStatusClass(usuario.condicao)}`;
        
        resultadoItem.innerHTML = `
            <h3>${usuario.nome} (${usuario.sexo === 'feminino' ? 'Feminino' : 'Masculino'})</h3>
            <p><strong>Peso:</strong> ${usuario.peso} kg</p>
            <p><strong>Altura:</strong> ${usuario.altura} m</p>
            <p><strong>IMC:</strong> ${usuario.imc.toFixed(2)}</p>
            <p><strong>Condição:</strong> ${usuario.condicao}</p>
            <p><strong>Recomendação:</strong> ${usuario.recomendacao}</p>
        `;
        
        listaResultados.appendChild(resultadoItem);
    });
    
    document.getElementById('resultados').classList.remove('hidden');
}


document.getElementById('imcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
   
    const nome = document.getElementById('nome').value;
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    const imc = calcularIMC(peso, altura);
    
 
    const condicaoInfo = determinarCondicao(imc, sexo);
    
 
    const diferencaPeso = calcularDiferencaPeso(imc, altura, sexo, condicaoInfo);
    const recomendacao = formatarDiferencaPeso(diferencaPeso);
    

    dadosUsuarios.push({
        nome,
        sexo,
        peso,
        altura,
        imc,
        condicao: condicaoInfo.condicao,
        recomendacao
    });
    

    exibirResultados();
    

    this.reset();
});