// Arrays com caracteres válidos para cada base
var caracteresBinario = ['0', '1'];
var caracteresOctal = ['0', '1', '2', '3', '4', '5', '6', '7'];
var caracteresDecimal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var caracteresHexadecimal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f'];

// Função para validar entrada
function validarEntrada(valor, base) {
    var caracteresValidos;
    
    if (base == 'binario') caracteresValidos = caracteresBinario;
    if (base == 'octal') caracteresValidos = caracteresOctal;
    if (base == 'decimal') caracteresValidos = caracteresDecimal;
    if (base == 'hexadecimal') caracteresValidos = caracteresHexadecimal;
    
    for (var i = 0; i < valor.length; i++) {
        var caracterValido = false;
        for (var j = 0; j < caracteresValidos.length; j++) {
            if (valor[i] == caracteresValidos[j]) {
                caracterValido = true;
                break;
            }
        }
        if (!caracterValido) return false;
    }
    return true;
}

// Função para converter número
function converterNumero(entrada, deBase) {
    var valorBase;
    if (deBase == 'binario') valorBase = 2;
    if (deBase == 'octal') valorBase = 8;
    if (deBase == 'decimal') valorBase = 10;
    if (deBase == 'hexadecimal') valorBase = 16;
    
    var decimal = parseInt(entrada, valorBase);
    if (!decimal && decimal !== 0) return null;
    
    return [
        decimal.toString(2),
        decimal.toString(8),
        decimal.toString(10),
        decimal.toString(16).toUpperCase()
    ];
}

// Função para alternar tema
function alternarTema() {
    var tema = document.body.dataset.theme;
    if (tema == 'dark') {
        document.body.dataset.theme = '';
    } else {
        document.body.dataset.theme = 'dark';
    }
}

// Função para gerenciar checkboxes
function gerenciarCheckboxes(checkboxClicado) {
    var checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i] != checkboxClicado) {
            checkboxes[i].checked = false;
        }
    }
}

// Função principal
function converter() {
    var entrada = document.getElementById('entrada').value;
    if (entrada == '') {
        alert('Digite um número!');
        return;
    }
    
    var baseOrigem = '';
    if (document.getElementById('ehBinario').checked) baseOrigem = 'binario';
    if (document.getElementById('ehOctal').checked) baseOrigem = 'octal';
    if (document.getElementById('ehDecimal').checked) baseOrigem = 'decimal';
    if (document.getElementById('ehHexadecimal').checked) baseOrigem = 'hexadecimal';
    
    if (baseOrigem == '') {
        alert('Selecione a base do número!');
        return;
    }
    
    if (validarEntrada(entrada, baseOrigem) == false) {
        alert('Número inválido para a base selecionada!');
        return;
    }

    var resultados = converterNumero(entrada, baseOrigem);
    if (resultados == null) {
        return;
    }
    
    document.getElementById('resultadoBinario').textContent = resultados[0];
    document.getElementById('resultadoOctal').textContent = resultados[1];
    document.getElementById('resultadoDecimal').textContent = resultados[2];
    document.getElementById('resultadoHexadecimal').textContent = resultados[3];
}