document.addEventListener('DOMContentLoaded', async function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const idUser = usuarioDatos.id;

    const response = await fetch('/historial', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUser }),
    });

    const data = await response.json();

    if (data.exists) {
        const historial = data.result;
        const contenedor = document.querySelector(".contenedor");

        historial.forEach(item => {

            var nuevoDiv = document.createElement("div");
            nuevoDiv.classList.add("movimiento");


            nuevoDiv.innerHTML = `
                <p>${item.Concepto}</p>
                <p class="monto">$${item.Monto}</p>
                <p>${item.Fecha}</p>
            `;


            contenedor.appendChild(nuevoDiv);
        });
    } else {
        console.log("No se encontraron registros en el historial para este usuario.");
    }

    if (usuarioDatos && usuarioDatos.nombres) {
        document.getElementById('nombreUsuario').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    }
});


document.getElementById('back-btn').addEventListener('click', function(){
    window.location.href = '../menu_retirar.html';
});

document.getElementById('exit-btn').addEventListener('click', function(){
    window.location.href = '../../menu_principal.html';
});






