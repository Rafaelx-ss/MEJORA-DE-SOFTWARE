document.addEventListener('DOMContentLoaded', function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    document.getElementById('account-owner').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    document.getElementById('account-number').textContent = `${usuarioDatos.tarjetaDebito}`;
    document.getElementById('montocuenta').textContent = `$${usuarioDatos.saldoTarjetaDebito}`;


    if (usuarioDatos.saldoTarjetaDebito > 9000) {
        document.getElementById('maxMonto').textContent = `9000`;
    }else{
        var billetes20 = Math.floor(usuarioDatos.saldoTarjetaDebito / 50);
        var valor = billetes20 * 50;
        document.getElementById('maxMonto').textContent = `${valor}`;
    }
});


document.getElementById('continue-btn').addEventListener('click', async function(e) {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));

    e.preventDefault();

    var monto = document.getElementById('amount').value;
    var billetes20 = Math.floor(usuarioDatos.saldoTarjetaDebito / 50);
    var valor = billetes20 * 50;
    if (monto && esMontoValido(Number(monto))) {

        if (monto > 9000) {
            alert('No se puede retirar mas de $9,000.');
        }
        else if (usuarioDatos.saldoTarjetaDebito > 9000 && monto <= 9000) {
            localStorage.setItem('transaccion', JSON.stringify({ monto }));
            window.location.href = './confirmar.html';
            
        }else if (monto <= valor){
                localStorage.setItem('transaccion', JSON.stringify({ monto }));
                window.location.href = './confirmar.html'; 
        }
        else{
            alert('El monto ingresado no es válido.');
        }
        }
    else if (!esMontoValido(Number(monto))) {
        alert('El monto ingresado no es válido. Por favor, ingrese un monto que pueda ser compuesto por billetes de 50, 100, 200, 500, o 1000.');
    } else {
        alert('Por favor, complete todos los campos antes de continuar.');
    }
});

function esMontoValido(monto) {

    const denominaciones = [1000, 500, 200, 100, 50];
    for (let i = 0; i < denominaciones.length; i++) {
        const denominacion = denominaciones[i];
        if (monto >= denominacion) {
            monto -= Math.floor(monto / denominacion) * denominacion;
        }
    }
    return monto === 0;
}

document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = '../menu_retirar.html';
});


