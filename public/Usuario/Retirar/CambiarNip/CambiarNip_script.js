
document.addEventListener('DOMContentLoaded', function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const optionServicio = JSON.parse(localStorage.getItem('optionServicio'));
    
    document.getElementById('nombreUsuario').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    document.getElementById('tarjeta').textContent = `${usuarioDatos.tarjetaCredito}`;
    document.getElementById('monto').textContent = `$${usuarioDatos.saldoTarjetaCredito}`;
    const saldoTarjetaCredito = usuarioDatos.saldoTarjetaCredito;

    const montoMinimo = (saldoTarjetaCredito * 0.05).toFixed(2);
    const montoIntereses = (saldoTarjetaCredito * 0.7).toFixed(2);

    document.getElementById('monto-minimo').textContent = `$${montoMinimo}`;
    document.getElementById('monto-intereses').textContent = `$${montoIntereses}`;
    
});


document.getElementById('back-btn').addEventListener('click', function(){
    window.location.href = '../menu_retirar.html';
});

document.getElementById('exit-btn').addEventListener('click', function(){
    window.location.href = '../../menu_principal.html';
});


document.getElementById('continuar').addEventListener('click', async function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const tarjetaDebito = usuarioDatos.tarjetaDebito;
    const inputNIP = document.getElementById('nip');
    const nipValue = inputNIP.value;


    if (nipValue.length !== 4) {
        alert('Por favor, ingrese exactamente 4 números.');
    }else{
        try {
            const response = await fetch('/cambiarNip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  nipValue, tarjetaDebito }),
            });
    
            if (!response.ok) {
                throw new Error('La respuesta del servidor no fue OK');
            }
    
            const data = await response.json();
            if (data.success) {
                const reciboMensaje = `Su NIP se ha cambiado correctamente.\n\n\nCualquier aclaración, consulte a su Rafita mas cercano.`;
                
                alert(reciboMensaje);
    
                const respuesta = await fetch('/verifyUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tarjetaDebito }),
                });
                const datos = await respuesta.json();
                localStorage.setItem('usuarioDatos', JSON.stringify(datos.result[0]));
    
                window.location.href = '../menu_retirar.html';
            } else {
                alert('No se pudo realizar el depósito. Por favor, inténtelo de nuevo.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al conectar con el servidor.');
        }
    }
});







/*
//const tarjetaDebito = usuarioDatos.tarjetaDebito;
const respuesta = await fetch('/verifyUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tarjetaDebito }),
});
const datos = await respuesta.json();
localStorage.setItem('usuarioDatos', JSON.stringify(datos.result[0]));
*/