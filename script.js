// Padrões para validação de cada base numérica
var padroesBases = {
    binario: ['0', '1'],
    octal: ['0', '1', '2', '3', '4', '5', '6', '7'],
    decimal: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    hexadecimal: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f']
};

// Função para validar entrada de acordo com a base
function validarEntrada(valor, base) {
    var caracteresValidos = padroesBases[base];
    for (var i = 0; i < valor.length; i++) {
        if (caracteresValidos.indexOf(valor[i]) == -1) {
            return false;
        }
    }
    return true;
}

// Mapeamento de bases para seus valores numéricos
const mapaBases = {
    binario: 2,
    octal: 8,
    decimal: 10,
    hexadecimal: 16
};

// Converte um número de uma base para todas as outras
function converterNumero(entrada, deBase) {
    var decimal = parseInt(entrada, mapaBases[deBase]);
    if (!decimal && decimal !== 0) return null;
    
    var resultado = {};
    for (var base in mapaBases) {
        var valor = decimal.toString(mapaBases[base]);
        if (base == 'hexadecimal') {
            valor = valor.toUpperCase();
        }
        resultado[base] = valor;
    }
    return resultado;
}

// Alterna entre tema claro e escuro
function alternarTema() {
    var tema = document.body.dataset.theme;
    if (tema == 'dark') {
        document.body.dataset.theme = '';
    } else {
        document.body.dataset.theme = 'dark';
    }
    // Removida a linha: localStorage.setItem('tema', document.body.dataset.theme);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Removido o código que restaura o tema salvo:
    // var tema = localStorage.getItem('tema');
    // if (tema) {
    //     document.body.dataset.theme = tema;
    // }

    // Configura os checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].onchange = function(e) {
            if (e.target.checked) {
                gerenciarCheckboxes(e.target);
            }
        };
    }

    // Configura o botão de alternar tema
    document.querySelector('#alternarTema').onclick = alternarTema;
});

// Gerencia os checkboxes para permitir apenas um selecionado
function gerenciarCheckboxes(checkboxClicado) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var checkbox of checkboxes) {
        if (checkbox != checkboxClicado) {
            checkbox.checked = false;
        }
    }
}

// Função principal de conversão
function converter() {
    var entrada = document.querySelector('#entrada').value;
    if (!entrada) {
        alert('Digite um número!');
        return;
    }
    
    var bases = ['ehBinario', 'ehOctal', 'ehDecimal', 'ehHexadecimal'];
    var baseOrigem = null;
    
    for (var base of bases) {
        if (document.querySelector('#' + base).checked) {
            baseOrigem = base;
            break;
        }
    }
    if (!baseOrigem) {
        alert('Selecione a base do número!');
        return;
    }

    const baseNormalizada = baseOrigem.replace('eh', '').toLowerCase();
    
    if (!validarEntrada(entrada, baseNormalizada)) {
        alert('Número inválido para a base selecionada!');
        return;
    }

    const resultados = converterNumero(entrada, baseNormalizada);
    if (resultados) {
        Object.entries(resultados).forEach(([base, valor]) => {
            document.querySelector(`#resultado${base.charAt(0).toUpperCase() + base.slice(1)}`).textContent = valor;
        });
    }
}

// Copia o resultado para a área de transferência
function copiarParaAreaTransferencia(texto, botao) {
    navigator.clipboard.writeText(texto);
    
    // Feedback visual
    var textoOriginal = botao.textContent;
    botao.textContent = "Copiado!";
    botao.style.backgroundColor = "#4CAF50";
    
    setTimeout(function() {
        botao.textContent = textoOriginal;
        botao.style.backgroundColor = "";
    }, 1500);
}