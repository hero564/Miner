/////////////////////
////Basic Canvas Setings
var canv = document.createElement('canvas');
document.body.appendChild(canv);
canv.id='example';

var canvas = document.getElementById("example");
var ctx= canvas.getContext('2d');

//////////////////
//////Game class//////
function HeroGame(){
	this.init=function(width,height,fps,func_update){
	
		canvas.width=width;
		canvas.height=height;

		var update=function(){
		ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
		func_update();
		};
		var timer = setInterval(update, 1000/fps);
	};
};

////////////////
///////Image Class//////
function HeroImage(path){
	var img=new Image();
	img.src=path;
	this.draw=function(px,py){
		ctx.drawImage(img,px,py);
	};
};

//////////////////////////////
/////////RectangleShape class//////////
function HeroRectangleShape(shape_x,shape_y,shape_width,shape_height){
	/*x:shape_x;
	y:shape_y;
	width:shape_width;
	height:shape_height;*/
	this.x=shape_x;
	this.y=shape_y;
	this.width=shape_width;
	this.height=shape_height;
	//checking collides width another HeroRectangleShape <sh>
	this.checkRectangleCollide=function(sh){
		var lu=inBorder(sh.x,sh.y,this.x,this.y,this.x+this.width,this.y+this.width);
		var lb=inBorder(sh.x,sh.y+sh.height,this.x,this.y,this.x+this.width,this.y+this.width);
		var rb=inBorder(sh.x+sh.width,sh.y+sh.height,this.x,this.y,this.x+this.width,this.y+this.width);
		var ru=inBorder(sh.x+sh.width,sh.y,this.x,this.y,this.x+this.width,this.y+this.width);
		
		
		if (lu || lb || rb || ru){
			return true;
		}else{
			return false;
		}
	};
	//draw the shape
	this.draw=function(){
		//ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.fillRect(this.x,this.y,this.width,this.height);
	};
};
//in border checker
function inBorder(pointx,pointy,x1,y1,x2,y2){
	if (pointx>x1 && pointx<x2 && pointy>y1 && pointy<y2){
		return true;
	}else{
		return false;
	}
}

///////////////////////////////
/////////Button class
///////// constructor(number,number,number,number,HeroImage,HeroImage,function)
function HeroButton(pos_x,pos_y,b_width,b_height,img_in,img_out,when_clicked){
	this.x=pos_x,
	this.y=pos_y,
	this.width=b_width,
	this.height=b_height,
	this.img_on=img_in,
	this.img_out=img_out,
	this.mob=false,
	this.clicked=false,
	this.click_func=when_clicked,

	this.update=function(){
		if (inBorder(Mouse.x,Mouse.y,this.x,this.y,this.x+this.width,this.y+this.height)){
			this.mob=true;
			this.img_on.draw(this.x,this.y);
		}else{
			this.mob=false;
			this.img_out.draw(this.x,this.y);
		}
		if(this.mob && Mouse.isLeftDown()){
			if (!this.clicked){
				this.clicked=true;
				this.click_func();
			}
		}else{
			this.clicked=false;
		}
	}
};

/////////////////////////
/////////Text Controller
var Text={
};
//set the drawing font in style "Arial 20x" 
Text.setFont=function(fnt_name){
	ctx.font=fnt_name;
};
//draw the string <txt> in position <x,y>
Text.draw=function(txt,x,y){
	ctx.fillText(txt,x,y);
};


////////////////////////////
//////////Mouse controller
var Mouse={
	x:0,
	y:0,
	isDown:false,
	getX:function(){
		return this.x;
	},
	getY:function(){
		return this.y;
	},
	isLeftDown:function(){
		return this.isDown;	
	}
};
//Geting mouse position (for events)
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}
//listeners for mouse events
canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
		Mouse.x=mousePos.x;
		Mouse.y=mousePos.y;
	}, false);

canvas.addEventListener("mousedown", function(){
	Mouse.isDown=true;
}, false);
canvas.addEventListener("mouseup", function(){
	Mouse.isDown=false;
}, false);