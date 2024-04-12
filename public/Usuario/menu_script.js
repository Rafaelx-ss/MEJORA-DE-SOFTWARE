document.addEventListener('DOMContentLoaded', function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));

    if (usuarioDatos && usuarioDatos.nombres) {
        document.getElementById('nombreUsuario').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    }
});



document.getElementById('exit-btn').addEventListener('click', function() {
    window.location.href = '../index.html';
});


document.getElementById('option-Depositar').addEventListener('click', function() {
    window.location.href = './Depositos/Monto.html';
});

document.getElementById('option-Pagar').addEventListener('click', function() {
    window.location.href = './Pagar/menu_pagos.html';
});


document.getElementById('option-Retirar').addEventListener('click', function() {
    window.location.href = './Retirar/menu_retirar.html';
});
