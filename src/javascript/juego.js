

(() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['J','K','Q','A']
    let puntosjugador = 0;
    let puntoscomputadora = 0;


    //referencias html

    const btnpedir = document.querySelector('#btnpedir');
    const btnnuevo = document.querySelector('#btnnuevo');
    const btndetener = document.querySelector('#btndetener');
    const smalls = document.querySelectorAll('small');
    const cartasjugador = document.querySelector('#jugador-cartas');
    const cartascomputadora = document.querySelector('#computadora-cartas');

    // esta funcion crea un deck normal
    const creardeck = () => {
        for(let i=2; i<=10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);  
            }
        }
        

        for(let tipo of tipos){
            for(let esp of especiales){
                // console.log(deck);
                deck.push(esp + tipo);
            }
        }

        deck = _.shuffle(deck);// aqui se mezcla el deck completo
        //console.log(deck);
        return deck;// se retorna el deck ya mezclado
    }

    creardeck(); // SE CREO LA FUNCION DE CREAR EL DECK ALEATORIO



    

    const pedircarta = () => {
        

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        const carta = deck.pop();
    // console.log(deck);
        //console.log(carta);

        return carta;
    }

    //pedircarta();

    const valorcarta = (carta) =>{
        const valor = carta.substring(0,carta.length - 1); 
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    //const valor = valorcarta(pedircarta());
    //console.log({valor});

    //TURNO DE LA COMPUTADORA
    const turnocomputadora = (puntosminimos) =>{
    do{
            const carta = pedircarta();

            puntoscomputadora = puntoscomputadora + valorcarta(carta);
            smalls[1].innerText = puntoscomputadora;

            //<!--<img class="carta" src="./cartas/2C.png" alt="">-->
            const imgcarta = document.createElement('img');
            imgcarta.src = `./cartas/${carta}.png`;
           
            imgcarta.classList.add('carta');
            cartascomputadora.append(imgcarta);

            if(puntosminimos > 21){
                break;
            }

        }
    while((puntoscomputadora < puntosminimos) && (puntosminimos <= 21));

    if(puntoscomputadora === puntosminimos){
        alert("Empate nadie gana");
    }
    else if(puntosminimos > 21){
        alert("computadora gana");
    }
    else if(puntoscomputadora > 21){
        alert("Has ganado jeje");
    }
    }

    // eventos de botones

    btnpedir.addEventListener('click', () => {
        const carta = pedircarta();

        puntosjugador = puntosjugador + valorcarta(carta);
        smalls[0].innerText = puntosjugador;

        //<!--<img class="carta" src="./cartas/2C.png" alt="">-->
        const imgcarta = document.createElement('img');
        imgcarta.src = `./cartas/${carta}.png`;
        imgcarta.classList.add('carta');
        cartasjugador.append(imgcarta);
        

        if(puntosjugador > 21){
            alert("has perdido");
            btnpedir.disabled = true;
            btndetener.disabled = true;
            turnocomputadora(puntosjugador);
        }
        else if(puntosjugador === 21){
            alert("ganaste");
            btnpedir.disabled = true;
            btndetener.disabled = true;
            turnocomputadora(puntosjugador);
        }
        
    });

    btndetener.addEventListener('click', () => { 
        btndetener.disabled = true;
        btnpedir.disabled =  true;

        turnocomputadora(puntosjugador);

    
        

    });


    //NUEVO JUEGO
    btnnuevo.addEventListener('click', () => {
        deck = [];
        deck = creardeck();
        puntosjugador = 0;
        puntoscomputadora = 0;
        btndetener.disabled = false;
        btnpedir.disabled =  false;
        smalls[0].innerText = 0;
        smalls[1].innerText = 0;
        cartascomputadora.innerHTML = '';
        cartasjugador.innerHTML = '';

    });


})();









