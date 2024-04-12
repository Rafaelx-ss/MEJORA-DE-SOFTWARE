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
    window.location.href = '../menu_principal.html';
});


document.getElementById('movimientos').addEventListener('click', function() {
    window.location.href = './Movimientos/movimientos.html';
});

document.getElementById('retirar-efectivo').addEventListener('click', function() {
    window.location.href = './RetirarEfectivo/Monto.html';
});

document.getElementById('NIP').addEventListener('click',function() {
    window.location.href = './CambiarNip/CambiarNip.html';
});

document.getElementById('tarjeta-credito').addEventListener('click', function() {
    window.location.href = './tarjetaCredito/tarjetaCredito.html'
});


