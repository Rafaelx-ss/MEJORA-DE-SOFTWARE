document.addEventListener('DOMContentLoaded', function() {
    // Leer los datos del usuario guardados
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));

    // Cambio aquí: usar la clave correcta para obtener los datos de la transacción
    const datos = JSON.parse(localStorage.getItem('transaccion'));

    document.getElementById('account-owner').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    document.getElementById('account-number').textContent = `${usuarioDatos.tarjetaDebito}`;

    // Asegúrate de que 'monto' y 'motivo' sean las claves correctas dentro del objeto 'datos'
    document.getElementById('monto').textContent = `$ ${datos.monto}`;
    document.getElementById('motivo2').textContent = `${datos.motivo}`;
});

document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = '../menu_principal.html';
});


document.getElementById('continue-btn').addEventListener('click', async function() {
    const transaccion = JSON.parse(localStorage.getItem('transaccion'));
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));

    const monto = transaccion.monto;
    const motivo = transaccion.motivo; // Asegúrate de tener el motivo en la transacción
    const tarjetaDebito = usuarioDatos.tarjetaDebito;
    const nombres = usuarioDatos.nombres + " " + usuarioDatos.apellidoPaterno + " " + usuarioDatos.apellidoMaterno;

    try {
        const response = await fetch('/realizarDeposito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tarjetaDebito, monto }),
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue OK');
        }

        const data = await response.json();
        if (data.success) {
            // Construir el mensaje del recibo
            const reciboMensaje = `Comprobante de Depósito:\n\nTitular de la Cuenta: ${nombres}\nNúmero de Tarjeta: ${tarjetaDebito}\nMonto Depositado: $${monto}\nMotivo: ${motivo}\n\nCualquier aclaración, consulte a su Rafita mas cercano.`;
            
            alert(reciboMensaje);

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

            const concepto = `Deposito - ${motivo}`
 
            var fechaU = new Date();
            var hora = fechaU.getHours();
            var minutos = fechaU.getMinutes();
            var dia = fechaU.getDate();
            var mes = fechaU.getMonth() + 1;
            var anio = fechaU.getFullYear();
            if (hora < 10) {
                hora = '0' + hora;
            }
            if (minutos < 10) {
                minutos = '0' + minutos;
            }
            if (dia < 10) {
                dia = '0' + dia;
            }
            if (mes < 10) {
                mes = '0' + mes;
            }
            var fecha = hora + ':' + minutos + ' ' + dia + '/' + mes + '/' + anio;

            const idUser = usuarioDatos.id;

            const respuestaMov = await fetch('/MovimientosCuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser, concepto, monto, fecha}),
            });
            const datosMov = await respuestaMov.json();
            

            
            window.location.href = '../menu_principal.html';
        } else {
            alert('No se pudo realizar el depósito. Por favor, inténtelo de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
    }
});
