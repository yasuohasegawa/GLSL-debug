// "random" method is optional
var GLSLDebugFunc = {
	mod: function(x,y)
	{
		return x - y * Math.floor(x/y);
	},
	fract: function(x)
	{
		return x - Math.floor(x);
	},
	length: function(vec2)
	{
		return Math.sqrt ( vec2.x*vec2.x + vec2.y*vec2.y );
	},
	step: function(edge, x)
	{
		if (x < edge )
	    {
	        return 1.0;
	    }
	    return 0.0;
	},
	random: function(seed)
	{
		return this.fract(Math.sin(seed.x+seed.y*1e3)*1e5);
	}
}

var Vec2 = function(x,y)
{
	this.x = (x == undefined)? 0 : x;
	this.y = (y == undefined)? 0 : y; 
}

var Vec3 = function(x,y,z)
{
	this.x = (x == undefined)? 0 : x;
	this.y = (y == undefined)? 0 : y; 
	this.z = (z == undefined)? 0 : z;
}