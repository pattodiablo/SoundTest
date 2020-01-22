var game = new Phaser.Game(540, 960, Phaser.AUTO, "", this);

var notas = ['nota1', 'nota1', 'nota1', 'nota1', 'nota2', 'nota2', 'nota2', 'nota2', 'nota1', 'nota2'];



var notaHeader = 0;
var tiempoGeneral = 1000;
var compas = 0;
var timer;
var attackTime;
var cancion;
var cancionEnCompases = [];
var loopTimes = 0;
var loopActual = 0;

function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;


}

function preload() {

    game.load.image('ejecutarBtn', 'assets/images/ejecutarBtn.png');
    game.load.image('escucharBtn', 'assets/images/escucharBtn.png');

}

function  detenerCancion(){

    timer.stop();
}
function cancionFondo(){

     Tone.Transport.bpm.value = 120;
        var synth = new Tone.Synth().toMaster();
        
        synth.triggerAttackRelease('B2', '4n', '0:0:0')
        synth.triggerAttackRelease('B3', '4n', '0:1:0')
        synth.triggerAttackRelease('B2', '8n', '0:2:1')
        synth.triggerAttackRelease('B3', '4n', '0:3:0')
        synth.triggerAttackRelease('E3', '4n', '1:0:0')
        synth.triggerAttackRelease('E4', '4n', '1:1:0')
        synth.triggerAttackRelease('E3', '8n', '1:2:1')
        synth.triggerAttackRelease('E4', '4n', '1:3:0')
        synth.triggerAttackRelease('A2', '4n', '2:0:0')
        synth.triggerAttackRelease('A3', '4n', '2:1:0')
        synth.triggerAttackRelease('A2', '8n', '2:2:1')
        synth.triggerAttackRelease('A3', '4n', '2:3:0')
        synth.triggerAttackRelease('D3', '4n', '3:0:0')
        synth.triggerAttackRelease('D4', '4n', '3:1:0')
        synth.triggerAttackRelease('D3', '8n', '3:2:1')
        synth.triggerAttackRelease('D4', '4n', '3:3:0')
        synth.triggerAttackRelease('B2', '4n', '4:0:0')
        synth.triggerAttackRelease('B3', '4n', '4:1:0')
        synth.triggerAttackRelease('B2', '8n', '4:2:1')
        synth.triggerAttackRelease('B3', '4n', '4:3:0')
        synth.triggerAttackRelease('E3', '4n', '5:0:0')
        synth.triggerAttackRelease('E4', '4n', '5:1:0')
        synth.triggerAttackRelease('E3', '8n', '5:2:1')
        synth.triggerAttackRelease('E4', '4n', '5:3:0')
        synth.triggerAttackRelease('A2', '4n', '6:0:0')
        synth.triggerAttackRelease('A3', '4n', '6:1:0')
        synth.triggerAttackRelease('A2', '8n', '6:2:1')
        synth.triggerAttackRelease('A3', '4n', '6:3:0')
        synth.triggerAttackRelease('D3', '4n', '7:0:0')
        synth.triggerAttackRelease('D4', '4n', '7:1:0')
        synth.triggerAttackRelease('D3', '8n', '7:2:1')
        synth.triggerAttackRelease('D4', '4n', '7:3:0')
        synth.triggerAttackRelease('B2', '4n', '8:0:0')
        synth.triggerAttackRelease('B3', '4n', '8:1:0')
        synth.triggerAttackRelease('B2', '8n', '8:2:1')
        synth.triggerAttackRelease('B3', '4n', '8:3:0')
        synth.triggerAttackRelease('E3', '4n', '9:0:0')
        synth.triggerAttackRelease('E4', '4n', '9:1:0')
        synth.triggerAttackRelease('E3', '8n', '9:2:1')
        synth.triggerAttackRelease('E4', '4n', '9:3:0')
        synth.triggerAttackRelease('B2', '4n', '10:0:0')
        synth.triggerAttackRelease('B3', '4n', '10:1:0')
        synth.triggerAttackRelease('B2', '8n', '10:2:1')
        synth.triggerAttackRelease('B3', '4n', '10:3:0')
        synth.triggerAttackRelease('E3', '4n', '11:0:0')
        synth.triggerAttackRelease('E4', '4n', '11:1:0')
        synth.triggerAttackRelease('E3', '8n', '11:2:1')
        synth.triggerAttackRelease('E4', '4n', '11:3:0')
}

function create() {

    var ejecutarBtn = game.add.sprite(game.width / 2, game.height / 2, 'ejecutarBtn');
    ejecutarBtn.anchor.x = 0.5;
    ejecutarBtn.anchor.y = 0.5;
    ejecutarBtn.scale.setTo(0.3, 0.3);
    ejecutarBtn.inputEnabled = true;

    var escucharBtn = game.add.sprite(game.width / 2, game.height / 2 + 100, 'escucharBtn');
    escucharBtn.anchor.x = 0.5;
    escucharBtn.anchor.y = 0.5;
    escucharBtn.scale.setTo(0.3, 0.3);
    escucharBtn.inputEnabled = true;

    escucharBtn.events.onInputDown.add(escucharCancion);


    teclasGrupo = game.add.group();
    notasGrupo = game.add.group();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;
    acorde1 = game.add.audio('acorde1');
    acorde2 = game.add.audio('acorde2');

    game.stage.backgroundColor = 0x000000;
    var graphics = game.add.graphics(0, 0);

    // set a fill and line style
    graphics.beginFill(0x7D7D7D);
    graphics.lineStyle(1, 0xA6A6A6, 1);

    // draw a shape
    graphics.moveTo(0, 0);
    graphics.lineTo(0, 250);
    graphics.lineTo(60, 250);
    graphics.lineTo(60, 0);
    graphics.lineTo(0, 0);

    graphics.endFill();


    cancionCompases();


    function escucharCancion() {
        timer = game.time.create(false);
        timer.loop(tiempoGeneral, crearNotas, this);
        timer.start();

    }




    for (var i = 1; i <= 7; i++) {
        var musicBtn = game.add.sprite(68 * i + 3, this.game.height / 1.2, graphics.generateTexture());
        musicBtn.anchor.set(0.5);
        musicBtn.inputEnabled = true;
        musicBtn.name = 'btn' + i;
        musicBtn.events.onInputDown.add(sonarBtn, this);
        musicBtn.events.onInputUp.add(pararMusica, this);
        game.physics.enable(musicBtn, Phaser.Physics.ARCADE);
        musicBtn.body.allowGravity = false;
        musicBtn.body.immovable = true;
        teclasGrupo.add(musicBtn);
    }
    //  And destroy the original graphics object

    graphics.destroy();


}



function cancionCompases() {

    cancion = [{ time: 0, note: 'btn4', dur: '8n' }, //LA INTRO SON 3 VUELTAS
        { time: 0.25, note: 'btn4', dur: '8n' },
        { time: 0.5, note: 'btn2', dur: '8n' },
        { time: 0.75, note: 'btn1', dur: '8n' },
        { time: 1.25, note: 'btn1', dur: '8n' },
        { time: 1.75, note: 'btn3', dur: '8n' },
        { time: 2.25, note: 'btn3', dur: '8n' },
        { time: 2.75, note: 'btn3', dur: '8n' },
        { time: 3, note: 'btn5', dur: '8n' },
        { time: 3.25, note: 'btn5', dur: '8n' },
        { time: 3.5, note: 'btn6', dur: '8n' },
        { time: 3.75, note: 'btn7', dur: '8n' },
        { time: 4, note: 'btn6', dur: '8n' },
        { time: 4.25, note: 'btn6', dur: '8n' },
        { time: 4.5, note: 'btn6', dur: '8n' },
        { time: 4.75, note: 'btn3', dur: '8n' },
        { time: 5.25, note: 'btn2', dur: '8n' },
        { time: 5.75, note: 'btn4', dur: '8n' },
        { time: 6.25, note: 'btn4', dur: '8n' },
        { time: 6.75, note: 'btn4', dur: '8n' },
        { time: 7, note: 'btn3', dur: '8n' },
        { time: 7.25, note: 'btn3', dur: '8n' },
        { time: 7.5, note: 'btn4', dur: '8n' },
        { time: 7.75, note: 'btn3', dur: '8n' }, //PRIMERA VUELTA FINITO
        { time: 8, note: 'btn4', dur: '8n' },
        { time: 8.25, note: 'btn4', dur: '8n' },
        { time: 8.5, note: 'btn2', dur: '8n' },
        { time: 8.75, note: 'btn1', dur: '8n' },
        { time: 9.25, note: 'btn1', dur: '8n' },
        { time: 9.75, note: 'btn3', dur: '8n' },
        { time: 10.25, note: 'btn3', dur: '8n' },
        { time: 10.75, note: 'btn3', dur: '8n' },
        { time: 11, note: 'btn5', dur: '8n' },
        { time: 11.25, note: 'btn5', dur: '8n' },
        { time: 11.5, note: 'btn6', dur: '8n' },
        { time: 11.75, note: 'btn7', dur: '8n' },
        { time: 12, note: 'btn6', dur: '8n' },
        { time: 12.25, note: 'btn6', dur: '8n' },
        { time: 12.5, note: 'btn6', dur: '8n' },
        { time: 12.75, note: 'btn3', dur: '8n' },
        { time: 13.25, note: 'btn2', dur: '8n' },
        { time: 13.75, note: 'btn4', dur: '8n' },
        { time: 14.25, note: 'btn4', dur: '8n' },
        { time: 14.75, note: 'btn4', dur: '8n' },
        { time: 15, note: 'btn3', dur: '8n' },
        { time: 15.25, note: 'btn3', dur: '8n' },
        { time: 15.5, note: 'btn4', dur: '8n' },
        { time: 15.75, note: 'btn3', dur: '8n' },
        { time: 16, note: 'btn4', dur: '8n' }, //SEGUNDA VUELTA FINITO
        { time: 16.25, note: 'btn4', dur: '8n' },
        { time: 16.5, note: 'btn2', dur: '8n' },
        { time: 16.75, note: 'btn1', dur: '8n' },
        { time: 17.25, note: 'btn1', dur: '8n' },
        { time: 17.75, note: 'btn3', dur: '8n' },
        { time: 18.25, note: 'btn3', dur: '8n' },
        { time: 18.75, note: 'btn3', dur: '8n' },
        { time: 19, note: 'btn5', dur: '8n' },
        { time: 19.25, note: 'btn5', dur: '8n' },
        { time: 19.5, note: 'btn6', dur: '8n' },
        { time: 19.75, note: 'btn7', dur: '8n' },
        { time: 20, note: 'btn6', dur: '8n' },
        { time: 20.25, note: 'btn6', dur: '8n' },
        { time: 20.5, note: 'btn6', dur: '8n' },
        { time: 20.75, note: 'btn3', dur: '8n' },
        { time: 21.25, note: 'btn2', dur: '8n' },
        { time: 21.75, note: 'btn4', dur: '8n' },
        { time: 22.25, note: 'btn4', dur: '8n' },
        { time: 22.75, note: 'btn4', dur: '8n' },
        { time: 23, note: 'btn3', dur: '8n' },
        { time: 23.25, note: 'btn3', dur: '8n' },
        { time: 23.5, note: 'btn4', dur: '8n' },
        { time: 23.75, note: 'btn3', dur: '8n' }, //TERCERA VUELTA FINITO
        { time: 24, note: 'btn3', dur: '8n' } //VERSO - HACER NUEVOS BUTONS PARA QUE FUNQUE 
    ];



    var notasEncompas = [];
    console.log(cancion.length - 1);
    var ultimoCompas = Math.floor(cancion[cancion.length - 1].time);

    console.log(ultimoCompas);


    for (var i = 0; i <= ultimoCompas; i++) {
        var compasActual = [];
        cancion.forEach(function(notaEncompas, index) {

            var TiempoDeNota = Math.floor(notaEncompas.time);

            if (TiempoDeNota == i) {

                compasActual.push(notaEncompas);

            }

        });
        cancionEnCompases.push(compasActual);
    }

    console.log(cancionEnCompases);

}


function crearNotas() {

    if (compas >= cancionEnCompases.length) {

        compas = 0; 

        console.log('incrementando loop ');
       loopActual++;
     
        if(loopActual>=loopTimes){
              console.log('terminando cancion ');
            detenerCancion();
        }
    }else{

          var compasActual = cancionEnCompases[compas];
    var cantidadNotas = compasActual.length;
    var notaaEjecutar = 0;

    console.log('estoy en compas ' + compas);

    console.log('cancion en compases largo ' + cancionEnCompases.length);
    console.log('loopActual ' + loopActual);

  

    compasActual.forEach(function(nota, index) {


        var timeCortado = nota.time - compas;
        var timeEnTime = timeCortado * tiempoGeneral;
        console.log('time cortado ' + timeCortado * 1000);
        //  console.log(nota);

        game.time.events.add(timeEnTime, lanzarNota, this, index);

    });
    }

  

    function lanzarNota(notaaEjecutar) {


        notaActual = compasActual[notaaEjecutar];
        console.log(notaActual);
        var notaPos = notaActual.note;

        var tiempoNotasExisten = [1, 2, 4, 8];
        var tiempoNota = notaActual.dur;



        switch (tiempoNota) {

            case '1n':
                var tamanoNota = 100;
                break;

            case '2n':
                var tamanoNota = 50;
                break;

            case '4n':
                var tamanoNota = 25;
                break;

            case '8n':
                var tamanoNota = 12.5;
                break;
        }


        switch (notaPos) {

            case 'btn1':
                var pos = 1;
                break;

            case 'btn2':
                var pos = 2;
                break;

            case 'btn3':
                var pos = 3;
                break;

            case 'btn4':
                var pos = 4;
                break;

            case 'btn5':
                var pos = 5;
                break;

            case 'btn6':
                var pos = 6;
                break;

            case 'btn7':
                var pos = 7;
                break;
        }





        var graphics2 = game.add.graphics(0, 0);
        graphics2.beginFill(0x7D7D7D);
        graphics2.lineStyle(1, 0xA6A6A6, 1);
        graphics2.moveTo(0, 0);
        graphics2.lineTo(0, tamanoNota);
        graphics2.lineTo(60, tamanoNota);
        graphics2.lineTo(60, 0);
        graphics2.lineTo(0, 0);
        graphics2.endFill();





        var notaDrop = game.add.sprite(68 * pos + 3, 0, graphics2.generateTexture());
        notaDrop.anchor.set(0.5);
        notaDrop.tiempo = tiempoNota;
        game.physics.enable(notaDrop, Phaser.Physics.ARCADE);
        notaDrop.body.gravity.y = 200;
        notasGrupo.add(notaDrop);
        graphics2.destroy();



    }
    compas++;
}

function sonarBtn(sprite) {
    var nombreNota = sprite.name;
    ejecutarBoton(nombreNota);
}

function sonarMusica(sprite, tiempoNota) {
    console.log('sonandoMusica');
    var nombreNota = sprite.name;
    btnSonar(nombreNota, tiempoNota);
}

function pararMusica(sprite) {
    var nombreNota = sprite.name;
    btnParar(nombreNota);
}


function decodeMusicTrack() {

    var queNota = notas[notaHeader];
    notaHeader++;

    switch (queNota) {

        case 'nota1':
            crearNota1();
            break;

        case 'nota2':
            crearNota2();
            break;

    }


}

function update() {


    game.physics.arcade.overlap(notasGrupo, teclasGrupo, null, overlapHandler, this)


}

var firstOverlap = 0;
function overlapHandler(nota, tecla) {


firstOverlap++;
if(firstOverlap==1){

cancionFondo();
}
    tecla.tint = Math.random() * 0xffffff;
    notasGrupo.remove(nota);

    sonarMusica(tecla, nota.tiempo);



}