/**
 * Volary - Root Object 
 */

function Volary()
{
	this.version = "0.0.1";
	this.id = undefined;
	this.models = [];
	this.modelsChangesStarted = 0;
	this.modelsChangesEnded = 0;
	this.views = [];
	this.controllers = [];
}

Volary.prototype.constructor = Volary;

Volary.prototype.getID = function()
{
	return this.id;
}
Volary.prototype.setID = function(id)
{
	this.id = id;
}

Volary.prototype.getVersion = function()
{
	return this.version;
}

Volary.prototype.modelsAdd = function(model)
{
	var success = false;
	
	var index = this.models.indexOf(model);
	if(index < 0)
	{
		model.setVolary(this);
		this.models.push(model);
		success = true;
	}
	
	return success;
}

Volary.prototype.modelsRemove = function(model)
{
	var success = false;
	
	var index = this.models.indexOf(model);
	if(0 <= index)
	{
		this.models = this.models.slice(index, index+1);
		model.setVolary(undefined);
		success = true;
	}
	
	return success;
}

Volary.prototype.modelsChangesStartedGet = function()
{
	return this.modelsChangesStarted;
}

Volary.prototype.modelsChangesStart = function()
{
	this.modelsChangesStarted = this.modelsChangesEnded + 1;
}

Volary.prototype.modelsChangesEndedGet = function()
{
	return this.modelsChangesEnded;
}

Volary.prototype.modelsChangesEnd = function()
{
	this.modelsChangesEnded = this.modelsChangesStarted;
}

Volary.prototype.viewsAdd = function(view)
{
	var success = false;
	
	var index = this.views.indexOf(view);
	if(index < 0)
	{
		view.setVolary(this);
		this.views.push(view);
		success = true;
	}
	
	return success;
}

Volary.prototype.viewsRemove = function(view)
{
	var success = false;
	
	var index = this.views.indexOf(view);
	if(0 <= index)
	{
		this.views = this.views.slice(index, index+1);
		view.setVolary(undefined);
		success = true;
	}
	
	return success;
}

Volary.prototype.viewsDraw = function()
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

function VolaryView()
{
	this.volary = undefined;
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
	this.modelsChangeDrawn = -1;
}

VolaryView.prototype.constructor = VolaryView;

VolaryView.prototype.getVolary = function()
{
	return this.volary;
}
VolaryView.prototype.setVolary = function(volary)
{
	this.volary = volary;
}

VolaryView.prototype.getID = function()
{
	return this.id;
}
VolaryView.prototype.setID = function(id)
{
	this.id = id;
}

VolaryView.prototype.getCanvasDocumentElement = function()
{
	return this.canvas.documentElement;
}

VolaryView.prototype.attachCanvasDocumentElement = function(canvasDocumentElement)
{
	this.canvas.documentElement = canvasDocumentElement;
	this.updateDocumentElement();
}

VolaryView.prototype.updateDocumentElement = function()
{
	var canvasDocumentElement = this.getCanvasDocumentElement();
	if(canvasDocumentElement)
	{
		canvasDocumentElement.width = this.getWidth();
		canvasDocumentElement.height = this.getHeight();
	}
	
}

VolaryView.prototype.getPosition = function()
{
	return this.position;
}

VolaryView.prototype.setPosition = function(position)
{
	this.position = position;
}

VolaryView.prototype.getX = function()
{
	return this.position.x;
}

VolaryView.prototype.setX = function(x)
{
	this.position.x = x;
}

VolaryView.prototype.getY = function()
{
	return this.position.y;
}

VolaryView.prototype.setY = function(y)
{
	this.position.y = y;
}

VolaryView.prototype.setSize = function(size)
{
	this.size = size;
	this.updateDocumentElement();
}

VolaryView.prototype.getSize = function()
{
	return this.size;
}

VolaryView.prototype.getWidth = function()
{
	return this.size.w;
}

VolaryView.prototype.setWidth = function(width)
{
	this.size.w = width;
	this.updateDocumentElement();
}

VolaryView.prototype.getHeight = function()
{
	return this.size.h;
}

VolaryView.prototype.setHeight = function(height)
{
	this.size.h = height;
	this.updateDocumentElement();
}

VolaryView.prototype.getBackgroundColor = function()
{
	return this.canvas.backgroundColor;
}

VolaryView.prototype.setBackgroundColor = function(backgroundColor)
{
	this.canvas.backgroundColor = backgroundColor;
}

VolaryView.prototype.getModelsChangeDrawn = function()
{
	return this.modelsChangeDrawn;
}

VolaryView.prototype.setModelsChangeDrawn = function(modelsChangeDrawn)
{
	this.modelsChangeDrawn = modelsChangeDrawn;
}


VolaryView.prototype.isPointWithin = function(position)
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

VolaryView.prototype.draw = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		var modelsChange2Apply = volary.modelsChangesEndedGet();
		var canvasDocumentElement = this.getCanvasDocumentElement();
		var ctx = canvasDocumentElement.getContext("2d");
		var backgroundColor = this.getBackgroundColor();
		if(backgroundColor)
		{
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, this.getWidth(), this.getHeight());	
		}
		var index;
		var model;
		for(index = 0; index < volary.models.length; ++index)
		{
			model = volary.models[index];
			if(modelsChange2Apply == model.getModelsChange())
			{
				model.draw(this, ctx);
			}
		}
		this.setModelsChangeDrawn(modelsChange2Apply);
	}
}


// VolaryView - public static methods
VolaryView.createDocumentElement = function(id)
{
	var element = document.createElement('canvas');
	element.id = id;
    document.getElementsByTagName('body') [0].appendChild(element);
	return element;
}


/**
 * Point - Model Object (that also can draw itself)
 */

function VolaryPixel()
{
	this.volary = undefined;
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
	this.depth = undefined;
	this.color = undefined;
	this.modelsChange = 0;
}

VolaryPixel.prototype.constructor = VolaryPixel;

VolaryPixel.prototype.getVolary = function()
{
	return this.volary;
}
VolaryPixel.prototype.setVolary = function(volary)
{
	this.volary = volary;
	this.updateModelsChange();
}

VolaryPixel.prototype.getModelsChange = function()
{
	return this.modelsChange;
}

VolaryPixel.prototype.updateModelsChange = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		this.modelsChange = volary.modelsChangesStartedGet();
	}
}

VolaryPixel.prototype.getID = function()
{
	return this.id;
}
VolaryPixel.prototype.setID = function(id)
{
	this.id = id;
}

VolaryPixel.prototype.getPosition = function()
{
	return this.position;
}

VolaryPixel.prototype.setPosition = function(position)
{
	this.position = position;
	this.updateModelsChange();
}

VolaryPixel.prototype.getX = function()
{
	return this.position.x;
}

VolaryPixel.prototype.setX = function(x)
{
	this.position.x = x;
	this.updateModelsChange();
}

VolaryPixel.prototype.getY = function()
{
	return this.position.y;
}

VolaryPixel.prototype.setY = function(y)
{
	this.position.y = y;
	this.updateModelsChange();
}

VolaryPixel.prototype.setSize = function(size)
{
	this.size = size;
	this.updateModelsChange();
}

VolaryPixel.prototype.getSize = function()
{
	return this.size;
}

VolaryPixel.prototype.getWidth = function()
{
	return this.size.w;
}

VolaryPixel.prototype.setWidth = function(width)
{
	this.size.w = width;
	this.updateModelsChange();
}

VolaryPixel.prototype.getHeight = function()
{
	return this.size.h;
}

VolaryPixel.prototype.setHeight = function(height)
{
	this.size.h = height;
	this.updateModelsChange();
}

VolaryPixel.prototype.getDepth = function()
{
	return this.depth;
}

VolaryPixel.prototype.setDepth = function(depth)
{
	this.depth = depth;
	this.updateModelsChange();
}

VolaryPixel.prototype.getColor = function()
{
	return this.color;
}

VolaryPixel.prototype.setColor = function(color)
{
	this.color = color;
	this.updateModelsChange();
}

VolaryPixel.prototype.draw = function(view, ctx)
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