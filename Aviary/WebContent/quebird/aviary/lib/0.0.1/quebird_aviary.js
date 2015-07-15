/**
 * Aviary - Root Object 
 */

function Aviary()
{
	this.version = "0.0.1";
	this.id = undefined;
	this.models = [];
	this.views = [];
	this.controllers = [];
	this.canvas = 
	{
		documentElement : undefined,
		backgroundColor : undefined
	};
}

Aviary.prototype.constructor = Aviary;

Aviary.prototype.getID = function()
{
	return this.id;
}
Aviary.prototype.setID = function(id)
{
	this.id = id;
}

Aviary.prototype.getVersion = function()
{
	return this.version;
}

Aviary.prototype.modelsAdd = function(model)
{
	var success = false;
	
	var index = this.models.indexOf(model);
	if(index < 0)
	{
		model.setAviary(this);
		this.models.push(model);
		success = true;
	}
	
	return success;
}

Aviary.prototype.modelsRemove = function(model)
{
	var success = false;
	
	var index = this.models.indexOf(model);
	if(0 <= index)
	{
		this.models = this.models.slice(index, index+1);
		model.setAviary(undefined);
		success = true;
	}
	
	return success;
}

Aviary.prototype.viewsAdd = function(view)
{
	var success = false;
	
	var index = this.views.indexOf(view);
	if(index < 0)
	{
		view.setAviary(this);
		this.views.push(view);
		success = true;
	}
	
	return success;
}

Aviary.prototype.viewsRemove = function(view)
{
	var success = false;
	
	var index = this.views.indexOf(view);
	if(0 <= index)
	{
		this.views = this.views.slice(index, index+1);
		view.setAviary(undefined);
		success = true;
	}
	
	return success;
}

Aviary.prototype.viewsDraw = function()
{
	var index;
	var view;
	for(index = 0; index < this.views.length; ++index)
	{
		view = this.views[index];
		view.draw();
	}
}




/**
 * View - Presentation Object (aka Canvas)
 */

function AviaryView()
{
	this.aviary = undefined;
	this.id = undefined;
	this.position = 
	{
		x : 0,
		y : 0
	};
	this.size =
	{
		w : 0,
		h : 0
	}
	this.canvas = 
	{
		documentElement : undefined,
		backgroundColor : undefined
	};
}

AviaryView.prototype.constructor = AviaryView;

AviaryView.prototype.getAviary = function()
{
	return this.aviary;
}
AviaryView.prototype.setAviary = function(aviary)
{
	this.aviary = aviary;
}

AviaryView.prototype.getID = function()
{
	return this.id;
}
AviaryView.prototype.setID = function(id)
{
	this.id = id;
}

AviaryView.prototype.getCanvasDocumentElement = function()
{
	return this.canvas.documentElement;
}

AviaryView.prototype.attachCanvasDocumentElement = function(canvasDocumentElement)
{
	this.canvas.documentElement = canvasDocumentElement;
	this.updateDocumentElement();
}

AviaryView.prototype.updateDocumentElement = function()
{
	var canvasDocumentElement = this.getCanvasDocumentElement();
	if(canvasDocumentElement)
	{
		canvasDocumentElement.width = this.getWidth();
		canvasDocumentElement.height = this.getHeight();
	}
	
}

AviaryView.prototype.getPosition = function()
{
	return this.position;
}

AviaryView.prototype.setPosition = function(position)
{
	this.position = position;
}

AviaryView.prototype.getX = function()
{
	return this.position.x;
}

AviaryView.prototype.setX = function(x)
{
	this.position.x = x;
}

AviaryView.prototype.getY = function()
{
	return this.position.y;
}

AviaryView.prototype.setY = function(y)
{
	this.position.y = y;
}

AviaryView.prototype.setSize = function(size)
{
	this.size = size;
	this.updateDocumentElement();
}

AviaryView.prototype.getSize = function()
{
	return this.size;
}

AviaryView.prototype.getWidth = function()
{
	return this.size.w;
}

AviaryView.prototype.setWidth = function(width)
{
	this.size.w = width;
	this.updateDocumentElement();
}

AviaryView.prototype.getHeight = function()
{
	return this.size.h;
}

AviaryView.prototype.setHeight = function(height)
{
	this.size.h = height;
	this.updateDocumentElement();
}

AviaryView.prototype.getBackgroundColor = function()
{
	return this.canvas.backgroundColor;
}

AviaryView.prototype.setBackgroundColor = function(backgroundColor)
{
	this.canvas.backgroundColor = backgroundColor;
}

AviaryView.prototype.isPointWithin = function(position)
{
	var result = false;
	if(this.position.x <= position.x && position.x < this.position.x + this.getWidth())
	{
		if(this.position.y <= position.y && position.y < this.position.y + this.getHeight())
		{
			result = true;
		}
	}
	return result;
}

AviaryView.prototype.draw = function()
{
	var canvasDocumentElement = this.getCanvasDocumentElement();
	var ctx = canvasDocumentElement.getContext("2d");
	var backgroundColor = this.getBackgroundColor();
	if(backgroundColor)
	{
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, this.getWidth(), this.getHeight());	
	}
	var aviary = this.getAviary();
	if(aviary)
	{
		var index;
		var model;
		for(index = 0; index < aviary.models.length; ++index)
		{
			model = aviary.models[index];
			model.draw(this, ctx);
		}
	}
}


// AviaryView - public static methods
AviaryView.createDocumentElement = function(id)
{
	var element = document.createElement('canvas');
	element.id = id;
    document.getElementsByTagName('body') [0].appendChild(element);
	return element;
}


/**
 * Point - Model Object (that also can draw itself)
 */

function AviaryPixel()
{
	this.aviary = undefined;
	this.id = undefined;
	this.position = 
	{
		x : undefined,
		y : undefined
	};
	this.size =
	{
		w : 1,
		h : 1
	}
	this.color = undefined;
}

AviaryPixel.prototype.constructor = AviaryPixel;

AviaryPixel.prototype.getAviary = function()
{
	return this.aviary;
}
AviaryPixel.prototype.setAviary = function(aviary)
{
	this.aviary = aviary;
}


AviaryPixel.prototype.getID = function()
{
	return this.id;
}
AviaryPixel.prototype.setID = function(id)
{
	this.id = id;
}

AviaryPixel.prototype.getPosition = function()
{
	return this.position;
}

AviaryPixel.prototype.setPosition = function(position)
{
	this.position = position;
}

AviaryPixel.prototype.getX = function()
{
	return this.position.x;
}

AviaryPixel.prototype.setX = function(x)
{
	this.position.x = x;
}

AviaryPixel.prototype.getY = function()
{
	return this.position.y;
}

AviaryPixel.prototype.setY = function(y)
{
	this.position.y = y;
}

AviaryPixel.prototype.setSize = function(size)
{
	this.size = size;
}

AviaryPixel.prototype.getSize = function()
{
	return this.size;
}

AviaryPixel.prototype.getWidth = function()
{
	return this.size.w;
}

AviaryPixel.prototype.setWidth = function(width)
{
	this.size.w = width;
}

AviaryPixel.prototype.getHeight = function()
{
	return this.size.h;
}

AviaryPixel.prototype.setHeight = function(height)
{
	this.size.h = height;
}

AviaryPixel.prototype.getColor = function()
{
	return this.color;
}

AviaryPixel.prototype.setColor = function(color)
{
	this.color = color;
}

AviaryPixel.prototype.draw = function(view, ctx)
{
	var thisColor = this.getColor();
	if(thisColor)
	{
		var thisPosition = this.getPosition();
		var isWithin = view.isPointWithin(thisPosition);
		if(isWithin)
		{
			var viewPosition = view.getPosition();
			ctx.fillStyle = thisColor;
			ctx.fillRect(thisPosition.x-viewPosition.x, thisPosition.y-viewPosition.y, this.getWidth(), this.getHeight());	
		}
	}
}