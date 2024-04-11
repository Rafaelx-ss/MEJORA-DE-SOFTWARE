document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const tarjetaDebito = document.getElementById('tarjetaDebito').value;

    try {
        const response = await fetch('/verifyUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tarjetaDebito }),
        });

        const data = await response.json();
        if (data.exists) {
            // Guardar los datos del usuario en localStorage
            localStorage.setItem('usuarioDatos', JSON.stringify(data.result[0])); // Asumiendo que 'data.result[0]' contiene los datos del usuario
            
            const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));


            let NIP = prompt("Ingese su NIP");

            if (NIP == usuarioDatos.pinTarjeta) {
                window.location.replace('./Usuario/menu_principal.html');

                console.log(usuarioDatos);
                
            }else{
                alert("NIP INCORRECTO.")
                window.location.reload();
            }


        } else {
            alert('El usuario no existe.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


