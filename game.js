var game=new HeroGame();

var img_on=new HeroImage('enemies.png');
var img_out=new HeroImage("button_big.png");

var button=new HeroButton(50,50,50,50,img_on,img_out,function(){
	Text.draw('Hello',150,150);
	});

function update(){
	button.update();
	if (Mouse.isLeftDown()){
		//Text.draw('Hello',150,150);
	}
}
game.init(500,500,30,update);