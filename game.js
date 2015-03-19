var game=new HeroGame();
//seting canvas size
var FRAME_WIDTH=640;
var FRAME_HEIGHT=480;

var lose=false;
var play=false;
var b_left=0;
//load images
var img_out=new HeroImage('assets/cell_0.png');
var img_in=new HeroImage("assets/cell_1.png");
var img_open=new HeroImage("assets/cell_2.png");
var img_bomb=new HeroImage("assets/cell_3.png");
//cell object
function Cell(pos_x,pos_y,is_bomb){
	this.x=pos_x;
	this.y=pos_y;
	this.is_bomb=is_bomb;
	this.is_press=false;
	this.but=new HeroButton(pos_x,pos_y,32,32,img_in,img_out,function(){console.log('hello');});
	this.update=function(){
		if (!this.is_press){
			this.but.update();
			if (this.but.clicked){
				this.is_press=true;
			}
		}else{
			if(this.is_bomb){
				img_bomb.draw(this.x,this.y);
			}else{
				img_open.draw(this.x,this.y);
			}
		}
		
	}

};
//calculate cell number in line/row
var cells_w=Math.floor(FRAME_WIDTH/32);
var cells_h=Math.floor(FRAME_HEIGHT/32)-1;
//create cells array
var cells=[];
for(var i=0;i<cells_w;i++){
	cells[i]=[];
	for(var j=0;j<cells_h;j++){
		var bomb=Math.floor(Math.random()*2);
		if (bomb<1){
			bomb=true;
			b_left++;
		}else if(bomb>=1){
			bomb=false;
		}
		cells[i][j]=new Cell(i*32,j*32+32,bomb);
	}
}

function update(){
	if (!play && !lose){
		Text.setFont("20px Arial");
		Text.draw('Press left mouse button to start',20,20);
		if (Mouse.isLeftDown()){
			play=true;
		}
	}
	if (play && !lose){
		Text.setFont("20px Arial");
		Text.draw("Bombs left: "+b_left+" Time: 100",20,20);
	}
	if (play && lose){
		Text.setFont("20px Arial");
		Text.draw('You Lose!Press left mouse button to start',20,20);
	}
	for(var i=0;i<cells_w;i++){
		for(var j=0;j<cells_h;j++){
			cells[i][j].update();
		}
	}
}
game.init(FRAME_WIDTH,FRAME_HEIGHT,30,update);