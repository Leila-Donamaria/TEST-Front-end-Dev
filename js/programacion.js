/**
 * Created by Leila on 05/10/2016.
 */
$(document).ready(function () {
    var inicio = $('#inicio');
    var trivia = $('#trivia');
    var comenzar = inicio.children('input').attr('value', 'comenzar');
    var siguiente = $('#trivia_btn').children('input').attr('value', 'siguiente');
    var pasos = trivia.children('div');
    var cont = 1;
    var opciones = $('#vacaciones ul li').children('img');

    function asignarPropiedades() {
        var nivel = 0;
        for (i = 0; i < 4; i++) {
            nivel--;
            $(pasos[i]).css('z-index', nivel);
            if (i != 0) {
                $(pasos[i]).css('display', 'none');
                $(pasos[i]).css('position', 'absolute');
            }
        }
    }

    function mostrarPaso(numero) {
        crearEstructura(numero);
        for (i = 0; i < 4; i++) {
            if (numero == i) {
                $(pasos[i]).show('slide', {direction: 'right'}, 800);
            } else {
                $(pasos[i]).hide('slide', {direction: 'left'}, 800);
            }

        }
    }

    function selectImg() {
        for (i = 0; i < 3; i++) {
            $(opciones[i]).css('cursor', 'pointer');
            $(opciones[i]).on('click', function () {
                for (i = 0; i < 3; i++) {
                    if ($(opciones[i]).data('select')) {
                        var seleccionada = opciones[i];
                    }
                }
                if ($(this).data('select')) {
                    $(this).attr('src', 'style/imgs/' + $(this).attr('alt') + '.png');
                    $(this).data('select', false);
                } else {
                    if (seleccionada) {
                        $(seleccionada).attr('src', 'style/imgs/' + $(seleccionada).attr('alt') + '.png');
                        $(seleccionada).data('select', false);
                    }
                    $(this).attr('src', 'style/imgs/' + $(this).attr('alt') + '-select.png');
                    $(this).data('select', true);
                }
            })
        }
    }

    function crearEstructura(numero) {
        var nombreImg = 'ciudad';
        for (i = 0; i < 4; i++) {
            if (numero == i) {
                var currentPaso = pasos[i];
            }
            if ($(opciones[i]).data('select') == true) {
                nombreImg = $(opciones[i]).attr('alt');
            }
        }
        var span = $('<span></span>').css('display', 'block');
        if (numero < 4) {
            var mensaje = $('<p></p>').text((numero + 1) + '.').append($(span))
        }
        if (numero > 0) {
            var resultado = $('<div></div>').append($('<div></div>').append($('<img />').attr('src', 'style/imgs/' + nombreImg + '-min.png')))
                .append($('<p></p>').text(nombreImg).addClass('lugar'));
            $('#combo').on('change', function () {
                $('#hidden').val($("#combo option:selected").val());
            });
            if ($('#hidden').val() != '') {
                $(resultado).append($('<p></p>').addClass('modelo').text($('#hidden').val()));
            } else {
                if (numero == 2 || numero == 3) {
                    $(resultado).append($('<p></p>').addClass('modelo').text('BMW Serie 3 Sedan 2016'));
                }
            }
        }
        if (numero == 3) {
            $('#trivia input[value=siguiente]').val('Crear playlist').css('top', '400px');
            $('#trivia_btn').css('bottom', '5px')
        }
        switch (numero) {
            case 0:
                span.html('¿Dónde te gustaría que fueran').append($('<span></span>').html(' tus próximas vacaciones?'));
                break;
            case 1:
                span.text('Escoge el modelo de tu Sedan');
                break;
            case 2:
                span.text('Completa el formulario');
                break;
            case 3:
                span.text('Disfruta la playlist creada para ti');
                break;
        }
        var estructura = $('<div></div>').addClass('estructura')
            .append($('<div></div>').append($('<img />').attr('src', 'style/imgs/bmw-logo.png').attr('alt', 'BMW')))
            .append($(mensaje).append($(span)))
            .append($(resultado));
        $(currentPaso).prepend(estructura);
    }

    function optimizarImagenes() {
        if ($(window).width() > 768) {
            $("#bmw").attr("src", "style/imgs/autob.png");
        } else {
            $("#bmw").attr("src", "style/imgs/auto-min.png");
        }
    }

    comenzar.on('click', function () {
        trivia.show('slide', {direction: 'right'}, 800);
        mostrarPaso(0);
        inicio.hide('slide', {direction: 'left'}, 800);
        ($(this).css('display', 'none'));
    });
    siguiente.on('click', function () {
        switch (cont.toString()) {
            case '1':
                $(pasos[0]).css('position', 'absolute');
                mostrarPaso(cont);
                break;
            case '2':
            case '3':
                mostrarPaso(cont);
                break;
        }
        cont++;
    });
    asignarPropiedades();
    selectImg();
    optimizarImagenes();
});