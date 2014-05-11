// This might help you better understanding of how GLSL works.
// So, please go a head to customize inside of "update" function.

var canvas;
var context;

var time = 0;
var w = 300;
var h = 300;
var resolution = new Vec2(w,h);
var size = w*h;
var imgData;
var canvasBuffer;

function init()
{
	canvas = document.getElementById("cv");
	context = canvas.getContext('2d');

	imgData = context.createImageData(w, h)
	canvasBuffer = imgData.data;

	requestAnimationFrame(Delegate.create(this, update));
}

function update()
{
	if (canvas.getContext) {
		// this code is from "http://glsl.heroku.com".
		for(var xx = 0; xx<w; xx++)
		{
			for(var yy = 0; yy<h; yy++)
			{
				var p = new Vec2(xx/resolution.x, yy/resolution.y);
				p.x = p.x - 0.5;
				p.y = p.y - 0.5;
				
				p.x *= resolution.x/resolution.y;
				var p2 = p;
				var c = GLSLDebugFunc.length(p2);
				for (var i = 0; i < 2; i++) {
					var d = GLSLDebugFunc.length(p2);
					var r = Math.atan2(p2.x,p2.y);
					var dt = (time*0.5)-d;
					d = 1.02 / d *  Math.sin(dt) *  Math.cos(dt) * 3.0;

					// some effective matrix rotation		
					var sc = new Vec2(Math.sin(r+d+time), Math.cos(r+d+time));

					p2 = new Vec2(sc.y*p2.x + sc.x*p2.y, -sc.x*p2.x + sc.y*p2.y);
					p2 = new Vec2(Math.abs(p2.x),Math.abs(p2.y));
					p2.x -= c;
					p2.y -= c;
					c += Math.sin(Number(i) + GLSLDebugFunc.length(p))*GLSLDebugFunc.length(p2);
				}
				var cst = Math.pow(c, 1.2)*(1.0/time)*10.0;
				var cs = new Vec3((Math.cos(cst+time)),(Math.cos(cst+time+4.0)),(Math.cos(cst+time+2.0)));
				
				var r = Math.abs(c*cs.x)/1*255;
				var g = Math.abs(c*cs.y)/1*255;
				var b = Math.abs(c*cs.z)/1*255;

				canvasBuffer[yy * 4 + xx * w * 4]     = Math.floor(r);
				canvasBuffer[1 + yy * 4 + xx * w * 4] = Math.floor(g);
				canvasBuffer[2 + yy * 4 + xx * w * 4] = Math.floor(b);
				canvasBuffer[3 + yy * 4 + xx * w * 4] = 255;
			}
		}
		context.putImageData(imgData, 0, 0);
		time += 0.05;
	}
	requestAnimationFrame(Delegate.create(this, update));
}

Delegate = {
    create: function (obj, func, params)
    {
        var f = function() { return func.apply(obj, params); };
        return f;
    }
}

window.requestAnimationFrame = (function()
{
	return  window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame   ||
	window.mozRequestAnimationFrame      ||
	window.oRequestAnimationFrame        ||
	window.msRequestAnimationFrame       ||
	function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
	};
})();