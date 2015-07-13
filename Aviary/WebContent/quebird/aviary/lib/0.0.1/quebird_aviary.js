/**
 * Aviary - Root Object 
 */

function Aviary()
{
	this.version = "0.0.1";
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
	this.canvas = 
	{
		documentElement : undefined,
		backgroundColor : undefined
	};
}

AviaryView.prototype.constructor = AviaryView;

AviaryView.prototype.create = function(id)
{
	var element = undefined;
	
	element = document.createElement('canvas');
	element.id = id;
    document.getElementsByTagName('body') [0].appendChild(element);
    this.canvas.documentElement = element;

    this.setID(id);
    this.setWidth(0);
    this.setHeight(0);
    
    return this.canvas.documentElement;
}

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

AviaryView.prototype.getPosition = function()
{
	return this.position;
}

AviaryView.prototype.setPosition = function(position)
{
	this.position = position;
}

AviaryView.prototype.setWidth = function(width)
{
	this.canvas.documentElement.width = width;
}

AviaryView.prototype.setHeight = function(height)
{
	this.canvas.documentElement.height = height;
}

AviaryView.prototype.setBackgroundColor = function(backgroundColor)
{
	this.canvas.backgroundColor = backgroundColor;
}

AviaryView.prototype.isPointWithin = function(position)
{
	var result = false;
	if(this.position.x <= position.x && position.x < this.position.x + this.canvas.documentElement.width)
	{
		if(this.position.y <= position.y && position.y < this.position.y + this.canvas.documentElement.height)
		{
			result = true;
		}
	}
	return result;
}

AviaryView.prototype.draw = function()
{
	var ctx = this.canvas.documentElement.getContext("2d");
	if(this.canvas.backgroundColor)
	{
		ctx.fillStyle = this.canvas.backgroundColor;
		ctx.fillRect(0, 0, this.canvas.documentElement.width, this.canvas.documentElement.height);	
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
	this.color = undefined;
}

AviaryPixel.prototype.constructor = AviaryPixel;

AviaryPixel.prototype.create = function(id)
{
    this.setID(id);
}

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

AviaryPixel.prototype.setColor = function(color)
{
	this.color = color;
}

AviaryPixel.prototype.draw = function(view, ctx)
{
	if(this.color)
	{
		if(view.isPointWithin(this.position))
		{
			var viewPosition = view.getPosition();
			ctx.fillStyle = this.color;
			ctx.fillRect(this.position.x-viewPosition.x, this.position.y-viewPosition.y, 1, 1);	
		}
	}
}