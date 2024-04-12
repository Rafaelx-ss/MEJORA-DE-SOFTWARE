document.addEventListener('DOMContentLoaded', function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));

    if (usuarioDatos && usuarioDatos.nombres) {
        document.getElementById('nombreUsuario').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    }
});

document.getElementById('back-btn').addEventListener('click', function(){
    window.location.href = '../menu_pagos.html';
});

document.getElementById('exit-btn').addEventListener('click', function(){
    window.location.href = '../../menu_principal.html';
});


document.getElementById('casa').addEventListener('click', function(){

    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    if (usuarioDatos.pagoHipotecario == 0) {
        alert("No tiene adeudo disponible.")
        window.location.reload();
        return;
        
    }

    let optionServicio = 'casa';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarCreditos.html';
});

document.getElementById('carro').addEventListener('click', function(){

    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    if (usuarioDatos.pagoCarro == 0) {
        alert("No tiene adeudo disponible.")
        window.location.reload();
        return;
        
    }

    let optionServicio = 'carro';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarCreditos.html';
});


document.getElementById('colegiatura').addEventListener('click', function(){

    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    if (usuarioDatos.pagoColegiatura == 0) {
        alert("No tiene adeudo disponible.")
        window.location.reload();
        return;
        
    }

    let optionServicio = 'colegiatura';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarCreditos.html';
});






