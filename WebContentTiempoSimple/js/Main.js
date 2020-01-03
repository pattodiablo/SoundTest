
var game = new Phaser.Game(540, 960, Phaser.AUTO, "", this);

 var notas = ['nota1','nota1','nota1','nota1','nota2','nota2','nota2','nota2','nota1','nota2'];



 var notaHeader = 0;
 var tiempoGeneral = 1000;
 var pulso=-1;
 var timer;
 var attackTime;
  var cancion;

function init() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

      
}

function preload() {
	
        game.load.image('speaker', 'assets/speaker.png');
        game.load.audio('drum1', ['assets/drum1.mp3','assets/drum1.ogg']);


        game.load.audio('acorde1', ['assets/sounds/acorde1.mp3','assets/sounds/acorde1.ogg']);
        game.load.audio('acorde2', ['assets/sounds/acorde2.mp3','assets/sounds/acorde2.ogg']);
}

function create() {
 
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
    graphics.moveTo(0,0);
    graphics.lineTo(0, 250);
    graphics.lineTo(80, 250);
    graphics.lineTo(80, 0);
    graphics.lineTo(0, 0);
 
    graphics.endFill();
    

    
    timer = game.time.create(false);
    timer.loop(tiempoGeneral, crearNotas, this);
    timer.start();


    for(var i=1; i<=5; i++){
        var musicBtn = game.add.sprite(90*i+5, this.game.height/1.2, graphics.generateTexture());
            musicBtn.anchor.set(0.5);
            musicBtn.inputEnabled = true;
            musicBtn.name = 'btn'+i;
            var eventoDown = 'sonarMusica'+2;
            var eventoUp = 'pararMusica'+2;
            console.log(eventoDown);
            musicBtn.events.onInputDown.add(sonarMusica, this);
            musicBtn.events.onInputUp.add(pararMusica, this);
            game.physics.enable(musicBtn, Phaser.Physics.ARCADE);
            musicBtn.body.allowGravity = false;
            musicBtn.body.immovable = true;
             teclasGrupo.add(musicBtn);
    }
    //  And destroy the original graphics object
  
    graphics.destroy();


}

function crearNotasRandom(){
    
    var tiempoNotasExisten = [1,2,4,8];
    var tiempoNota = tiempoNotasExisten[Math.floor(Math.random() * tiempoNotasExisten.length)];
    var tamanoNota = (100/tiempoNota);

    var graphics2 = game.add.graphics(0, 0);
    graphics2.beginFill(0x7D7D7D);
    graphics2.lineStyle(1, 0xA6A6A6, 1);
    graphics2.moveTo(0,0);
    graphics2.lineTo(0, tamanoNota);
    graphics2.lineTo(80, tamanoNota);
    graphics2.lineTo(80, 0);
    graphics2.lineTo(0, 0);
    graphics2.endFill();


    var pos = Math.ceil(Math.random()*5);

    var notaDrop = game.add.sprite(90*pos+5, 0, graphics2.generateTexture());
    notaDrop.anchor.set(0.5);
    notaDrop.tiempo=tiempoNota;
    game.physics.enable(notaDrop, Phaser.Physics.ARCADE);
    notaDrop.body.gravity.y = 200;
    notasGrupo.add(notaDrop);
    graphics2.destroy();
}

function crearNotas(){

cancion = [{ time : 1, note : 'C4', dur : '4n'},
        { time : 1.5, note : 'C4', dur : '4n'},
        { time : 2, note : 'C4', dur : '4n'},
        { time : 2.5, note : 'D4', dur : '4n'},
        { time : 3, note : 'E4', dur : '2n'},
        { time : 4, note : 'E4', dur : '2n'}, //HASTA AQUI PARTE1
        { time : 5, note : 'D4', dur : '4n'},
        { time : 5.5, note : 'C4', dur : '4n'},
        { time : 6, note : 'D4', dur : '4n'},
        { time : 6.5, note : 'E4', dur : '4n'},
        { time : 7, note : 'C4', dur : '2n'}, //HASTA AQUI PARTE2
        { time : 9, note : 'C4', dur : '4n'}, //SE REPITE TODO DE NUEVO
        { time : 9.5, note : 'C4', dur : '4n'},
        { time : 10, note : 'C4', dur : '4n'},
        { time : 10.5, note : 'D4', dur : '4n'},
        { time : 11, note : 'E4', dur : '2n'},
        { time : 12, note : 'E4', dur : '2n'},  //HASTA AQUI PARTE3
        { time : 13, note : 'D4', dur : '4n'},
        { time : 13.5, note : 'C4', dur : '4n'},
        { time : 14, note : 'D4', dur : '4n'},
        { time : 14.5, note : 'E4', dur : '4n'},
        { time : 15, note : 'C4', dur : '2n'}, //HASTA AQUI PARTE4
        { time : 16.5, note : 'E4', dur : '4n'},
        { time : 17, note : 'C4', dur : '2n'},
        { time : 18.5, note : 'E4', dur : '4n'},
        { time : 19, note : 'C4', dur : '2n'},
        { time : 20.5, note : 'E4', dur : '4n'},
        { time : 21, note : 'C4', dur : '4n'},
        { time : 21.5, note : 'E4', dur : '4n'},
        { time : 22, note : 'C4', dur : '4n'},
        { time : 22.5, note : 'E4', dur : '4n'},
        { time : 23, note : 'C4', dur : '2n'}];
   

   if(pulso>=cancion.length-1){
    pulso = 0;
   }else{

    pulso++;
   }
    
var notasEnPulso = [];
    cancion.forEach(function(notaEnPulso) {

                              var TiempoDeNota = Math.floor(notaEnPulso.time);

                              if(TiempoDeNota == pulso){

                                notasEnPulso.push(TiempoDeNota);
                                console.log(notasEnPulso.length);
                              }
                             
                    });


    notaActual = cancion[pulso];

    if(pulso == 0 ){

        notaAnterior = cancion[pulso];
    }else{
         notaAnterior = cancion[pulso-1];   
    }
    
    var notaPos = notaActual.note;

    var tiempoNotasExisten = [1,2,4,8];
    var tiempoNota = notaActual.dur;

   attackTime = notaActual.time - notaAnterior.time;
  
   console.log('pulso ' + pulso + ' tiempoNotaActual ' + notaActual.time +' attackTime ' + attackTime);

   switch (tiempoNota){

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


   switch (notaPos){

    case 'C4':
    var pos = 1;
    break;

    case 'D4':
   var pos = 2;
    break;

     case 'E4':
   var pos = 3;
    break;

     case 'F4':
   var pos = 4;
    break;

     case 'G4':
   var pos = 5;
    break;
}



   

    var graphics2 = game.add.graphics(0, 0);
    graphics2.beginFill(0x7D7D7D);
    graphics2.lineStyle(1, 0xA6A6A6, 1);
    graphics2.moveTo(0,0);
    graphics2.lineTo(0, tamanoNota);
    graphics2.lineTo(80, tamanoNota);
    graphics2.lineTo(80, 0);
    graphics2.lineTo(0, 0);
    graphics2.endFill();





    var notaDrop = game.add.sprite(90*pos+5, 0, graphics2.generateTexture());
    notaDrop.anchor.set(0.5);
    notaDrop.tiempo=tiempoNota;
    game.physics.enable(notaDrop, Phaser.Physics.ARCADE);
    notaDrop.body.gravity.y = 200;
    notasGrupo.add(notaDrop);
    graphics2.destroy();
}

function dothis(){
    console.log('do a shit in phaser');
}

function sonarMusica(sprite, tiempoNota){
var nombreNota = sprite.name;
btnSonar(nombreNota, tiempoNota);
}

function pararMusica(sprite, tiempoNota){
var nombreNota = sprite.name;
btnParar(nombreNota, tiempoNota);
}


function decodeMusicTrack(){

var queNota = notas[notaHeader];
notaHeader++;

    switch (queNota){

        case 'nota1':
        crearNota1();
        break;

        case 'nota2':
         crearNota2();
        break;

    }


}

function update() {

 game.physics.arcade.overlap(notasGrupo, teclasGrupo,null,overlapHandler,this)
 
//console.log(timer.duration.toFixed(0));
}

function overlapHandler(nota, tecla){

       notasGrupo.remove(nota);

       sonarMusica(tecla,nota.tiempo);
       

        
}