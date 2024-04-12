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

document.getElementById('servicios').addEventListener('click', function() {
    window.location.href = './servicios/servicios.html';
});

document.getElementById('creditos').addEventListener('click',function() {
    window.location.href = './creditos/creditos.html';
});

document.getElementById('tarjeta-credito').addEventListener('click', function() {

    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    if (usuarioDatos.saldoTarjetaCredito == 0) {
        alert("No tiene adeudo disponible.")
        window.location.reload();
        return;
        
    }

    window.location.href = './tarjetaCredito/tarjetaCredito.html'
});


