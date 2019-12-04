
var game = new Phaser.Game(540, 960, Phaser.AUTO, "", this);

 var notas = ['nota1','nota1','nota1','nota1','nota2','nota2','nota2','nota2','nota1','nota2'];



 var notaHeader = 0;

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
    
  
    
    var timer = game.time.create(false);
    timer.loop(300, crearNotasRandom, this);
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
    
    var tamanoNota = Math.ceil(Math.random()*100);

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
    game.physics.enable(notaDrop, Phaser.Physics.ARCADE);
    notaDrop.body.gravity.y = 200;
    notasGrupo.add(notaDrop);
    graphics2.destroy();
}

function dothis(){
    console.log('do a shit in phaser');
}

function sonarMusica(sprite){
var nombreNota = sprite.name;
btnSonar(nombreNota);
}

function pararMusica(sprite){
var nombreNota = sprite.name;
btnParar(nombreNota);
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

 function crearNota1(){
        

        musicTrigger = game.add.sprite(100, -100, 'speaker');
      musicTrigger.anchor.set(0.5);
         musicTrigger.inputEnabled = true;
         musicTrigger.events.onInputDown.add(acorde1Trigger, this);
        game.physics.arcade.enable(musicTrigger);
     
    
    }
 function crearNota2(){
        

        musicTrigger = game.add.sprite(360, -100, 'speaker');
      musicTrigger.anchor.set(0.5);
         musicTrigger.inputEnabled = true;
         musicTrigger.events.onInputDown.add(acorde2Trigger, this);
        game.physics.arcade.enable(musicTrigger);
     
    
    }
function acorde1Trigger(){
        acorde1.play();
  
}

function acorde2Trigger(){

       acorde2.play();
}

function update() {

 game.physics.arcade.overlap(notasGrupo, teclasGrupo,null,overlapHandler,this)
 

}

    function overlapHandler(nota, tecla){
sonarMusica(tecla);
}