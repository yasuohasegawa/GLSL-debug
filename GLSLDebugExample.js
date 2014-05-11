// This might help you better understanding of how GLSL works.
// So, please go a head to customize inside of "update" function.

var canvas;
var context;

var time = 0;
var w = 100;
var h = 100;
var resolution = new Vec2(w,h);
var size = w*h;

function init()
{
	canvas = document.getElementById("cv");
	context = canvas.getContext('2d');
	context.scale(5.0,5.0);
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
				
				var u = Math.abs(Math.sin((Math.atan2(p.y, p.x) - GLSLDebugFunc.length(p) + time) * 10.0) * 0.1) + 0.1;
				var r = 0.03 / Math.abs(u - GLSLDebugFunc.length(p) * 0.3);
				var g = 0.04 / Math.abs(u - GLSLDebugFunc.length(p) * 0.5);
				var b = 0.05 / Math.abs(u - GLSLDebugFunc.length(p) * 0.7);

				context.fillStyle ="rgb(" + Math.floor(r/1*256) + "," + Math.floor(g/1*256) + "," + Math.floor(b/1*256) +")";
				
				context.fillRect(xx,yy,1,1);
			}
		}

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