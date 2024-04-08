document.addEventListener('DOMContentLoaded', function() {
    // Leer los datos del usuario guardados
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));

    // Ejemplo: Actualizar el DOM con el nombre del usuario
    // Asegúrate de tener un elemento con id='nombreUsuario' en tu HTML
    document.getElementById('account-owner').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    document.getElementById('account-number').textContent = `${usuarioDatos.tarjetaDebito}`;

    
});


document.getElementById('continue-btn').addEventListener('click', async function(e) {
    e.preventDefault();

    var monto = document.getElementById('amount').value;
    var motivo = document.getElementById('Motivo').value;

    // Convertir monto a número y verificar si es válido
    if (monto && motivo && esMontoValido(Number(monto))) {
        localStorage.setItem('transaccion', JSON.stringify({ monto, motivo }));
        window.location.href = './confirmar.html';
    } else if (!esMontoValido(Number(monto))) {
        alert('El monto ingresado no es válido. Por favor, ingrese un monto que pueda ser compuesto por billetes de 20, 50, 100, 200, 500, o 1000.');
    } else {
        alert('Por favor, complete todos los campos antes de continuar.');
    }
});

function esMontoValido(monto) {
    const denominaciones = [1000, 500, 200, 100, 50, 20];
    for (let i = 0; i < denominaciones.length; i++) {
        const denominacion = denominaciones[i];
        if (monto >= denominacion) {
            monto -= Math.floor(monto / denominacion) * denominacion;
        }
    }
    return monto === 0;
}

document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = '../menu_principal.html';
});


