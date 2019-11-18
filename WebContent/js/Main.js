
var game = new Phaser.Game(540, 960, Phaser.AUTO, "", this);

function init() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
}

function preload() {
	
        game.load.image('speaker', 'assets/speaker.png');
        game.load.audio('drum1', ['assets/drum1.mp3','assets/drum1.ogg']);
}

function create() {
      drum1 = game.add.audio('drum1');

	game.stage.backgroundColor = 0x000000;
	var graphics = game.add.graphics(0, 0);

    // set a fill and line style
    graphics.beginFill(0x7D7D7D);
    graphics.lineStyle(1, 0xA6A6A6, 1);
    
    // draw a shape
    graphics.moveTo(0,0);
    graphics.lineTo(0, 80);
    graphics.lineTo(250, 80);
    graphics.lineTo(250, 0);
    graphics.lineTo(0, 0);
 
    graphics.endFill();
     
    
    musicBtn = game.add.sprite(game.stage.width/2, this.game.height/2, graphics.generateTexture());
    musicBtn.anchor.set(0.5);
    
    game.time.events.loop(Phaser.Timer.SECOND*1, crearNota, this);
    
	game.physics.arcade.enable(musicBtn);

	game.physics.arcade.gravity.y = 200;


	musicBtn.body.allowGravity = false;
	musicBtn.body.immovable = true;

    

    //  And destroy the original graphics object
  
    graphics.destroy();
	
}
 function crearNota(){
        

        musicTrigger = game.add.sprite(270, -100, 'speaker');
      musicTrigger.anchor.set(0.5);
         musicTrigger.inputEnabled = true;
         musicTrigger.events.onInputDown.add(doMusic, this);
        game.physics.arcade.enable(musicTrigger);
     
    
    }
function doMusic(){
        drum1.play();
  
}

function update() {
	
	
	
}
