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


document.getElementById('cfe').addEventListener('click', function(){
    let optionServicio = 'cfe';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarServicios.html';
});

document.getElementById('telmex').addEventListener('click', function(){
    let optionServicio = 'telmex';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarServicios.html';
});


document.getElementById('japay').addEventListener('click', function(){
    let optionServicio = 'japay';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarServicios.html';
});


document.getElementById('totalplay').addEventListener('click', function(){
    let optionServicio = 'totalplay';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarServicios.html';
});

document.getElementById('telcel').addEventListener('click', function(){
    let optionServicio = 'telcel';

    localStorage.setItem('optionServicio', JSON.stringify({ optionServicio }));

    window.location.href = './confirmarServicios.html';
});





