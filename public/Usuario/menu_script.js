document.addEventListener('DOMContentLoaded', function() {
    // Leer los datos del usuario guardados
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));

    // Ejemplo: Actualizar el DOM con el nombre del usuario
    // Asegúrate de tener un elemento con id='nombreUsuario' en tu HTML
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

