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

Volary.prototype.onModelChangeStarted = function(model)
{
	var index;
	var view;
	for(index = 0; index < this.views.length; ++index)
	{
		view = this.views[index];
		view.eraseModel(model);
	}
}

Volary.prototype.onModelChangeEnded = function(model)
{
	var index;
	var view;
	for(index = 0; index < this.views.length; ++index)
	{
		view = this.views[index];
		view.drawModel(model);
	}
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
		backgroundColor : undefined,
		imageData		: undefined,
		imageModels		: undefined,
		backgroundDrawn : false
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
		var ctx = canvasDocumentElement.getContext('2d');
		var canvasImageData = ctx.createImageData(this.getWidth(), this.getHeight());
		//var canvasImageModels = [];
		var rowArray = [];
		var columnArray;
		var entry;
		var i, j;
		for(i = 0; i < this.getWidth(); ++i)
		{
			columnArray = [];
			for(j = 0; j < this.getHeight(); ++j)
			{
				entry = [];
				columnArray.push(entry);
			}
			rowArray.push(columnArray);
		}
		this.setCanvasImageModels(rowArray);

		this.setCanvasImageData(canvasImageData);
		
		this.setBackgroundDrawn(false);
	}
}

VolaryView.prototype.getCanvasImageData = function()
{
	return this.canvas.imageData;
}

VolaryView.prototype.setCanvasImageData = function(canvasImageData)
{
	this.canvas.imageData = canvasImageData;
}

VolaryView.prototype.getCanvasImageModels = function()
{
	return this.canvas.imageModels;
}

VolaryView.prototype.setCanvasImageModels = function(canvasImageModels)
{
	this.canvas.imageModels = canvasImageModels;
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

VolaryView.prototype.getBackgroundDrawn = function()
{
	return this.canvas.backgroundDrawn;
}

VolaryView.prototype.setBackgroundDrawn = function(backgroundDrawn)
{
	this.canvas.backgroundDrawn = backgroundDrawn;
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


VolaryView.prototype.eraseModel = function(model)
{
	var volary = this.getVolary();
	if(volary)
	{
		var modelsChange2Apply = volary.modelsChangesStartedGet();
		var canvasDocumentElement = this.getCanvasDocumentElement();
		var canvasImageModels = this.getCanvasImageModels();
		var ctx = canvasDocumentElement.getContext("2d");
		var canvasImageData = this.getCanvasImageData();
		var backgroundColor = this.getBackgroundColor();
        var imageDataIndex;
		var pixel;
        var positionView = this.getPosition();
        var positionModel;
        var x, y;
        var canvasImageModelIndex = -1;
        var canvasImageModelEntries;
		
		if(modelsChange2Apply == model.getModelsChange())
		{
			positionModel = model.getPosition();
			if(this.isPointWithin(positionModel))
			{
				x = positionModel.x - positionView.x;
				y = positionModel.y - positionView.y;
				canvasImageModelEntries = canvasImageModels[x][y];
				var canvasImageModelIndex = canvasImageModelEntries.indexOf(model);
				if(0 <= canvasImageModelIndex)
				{
					canvasImageModels[x][y].splice(canvasImageModelIndex, canvasImageModelIndex+1);
				}
				
				pixel = {r:0,g:0,b:0,a:0};
				if(backgroundColor)
				{
					pixel = backgroundColor;
				}
				for(canvasImageModelIndex = 0; canvasImageModelIndex < canvasImageModelEntries.length; ++canvasImageModelIndex)
				{
					pixel = model.drawPixel(this, positionModel, pixel, canvasImageModelEntries);
				}
				imageDataIndex = 4*(x + y * this.getWidth());
				
				canvasImageData.data[imageDataIndex + 0] = pixel.r;
				canvasImageData.data[imageDataIndex + 1] = pixel.g;
				canvasImageData.data[imageDataIndex + 2] = pixel.b;
				canvasImageData.data[imageDataIndex + 3] = pixel.a;
			}
		}
	}
}

VolaryView.prototype.drawModel = function(model)
{
	var volary = this.getVolary();
	if(volary)
	{
		var modelsChange2Apply = volary.modelsChangesStartedGet();
		var canvasDocumentElement = this.getCanvasDocumentElement();
		var canvasImageModels = this.getCanvasImageModels();
		var ctx = canvasDocumentElement.getContext("2d");
		var canvasImageData = this.getCanvasImageData();
		var backgroundColor = this.getBackgroundColor();
        var imageDataIndex;
		var pixel;
        var positionView = this.getPosition();
        var positionModel;
        var x, y;
        var canvasImageModelIndex = -1;
        var canvasImageModelEntries;
		
		if(modelsChange2Apply == model.getModelsChange())
		{
			positionModel = model.getPosition();
			if(this.isPointWithin(positionModel))
			{
				x = positionModel.x - positionView.x;
				y = positionModel.y - positionView.y;
				
				canvasImageModelEntries = canvasImageModels[x][y];
				var canvasImageModelIndex = canvasImageModelEntries.indexOf(model);
				if(canvasImageModelIndex < 0)
				{
					canvasImageModels[x][y].push(model);
				}
				pixel = {r:0,g:0,b:0,a:0};
				if(backgroundColor)
				{
					pixel = backgroundColor;
				}
				for(canvasImageModelIndex = 0; canvasImageModelIndex < canvasImageModelEntries.length; ++canvasImageModelIndex)
				{
					pixel = model.drawPixel(this, positionModel, pixel, canvasImageModelEntries);
				}
				imageDataIndex = 4*(x + y * this.getWidth());
				
				canvasImageData.data[imageDataIndex + 0] = pixel.r;
				canvasImageData.data[imageDataIndex + 1] = pixel.g;
				canvasImageData.data[imageDataIndex + 2] = pixel.b;
				canvasImageData.data[imageDataIndex + 3] = pixel.a;
			}
		}
	}
}


VolaryView.prototype.drawModels = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		var canvasDocumentElement = this.getCanvasDocumentElement();
		var canvasImageModels = this.getCanvasImageModels();
		var ctx = canvasDocumentElement.getContext("2d");
		var canvasImageData = this.getCanvasImageData();
		var backgroundColor = this.getBackgroundColor();
        var imageDataIndex;
		var pixel;
        var positionView = this.getPosition();
        var positionModel;
        var x, y, w, h;
        w = this.getWidth();
        h = this.getHeight();
        var canvasImageModelIndex = -1;
        var canvasImageModelEntries;
        for(x = 0; x < w; ++x)
		{
        	for(y = 0; y < h; ++y)
        	{
        		canvasImageModelEntries = canvasImageModels[x][y];
				pixel = {r:0,g:0,b:0,a:0};
				if(backgroundColor)
				{
					pixel = backgroundColor;
				}
				for(canvasImageModelIndex = 0; canvasImageModelIndex < canvasImageModelEntries.length; ++canvasImageModelIndex)
				{
					model = canvasImageModelEntries[canvasImageModelIndex];
					positionModel = model.getPosition();
					pixel = model.drawPixel(this, positionModel, pixel, canvasImageModelEntries);
				}
				imageDataIndex = 4*(x + y * this.getWidth());
				
				canvasImageData.data[imageDataIndex + 0] = pixel.r;
				canvasImageData.data[imageDataIndex + 1] = pixel.g;
				canvasImageData.data[imageDataIndex + 2] = pixel.b;
				canvasImageData.data[imageDataIndex + 3] = pixel.a;
			}
		}
	}
}

VolaryView.prototype.draw = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		if(!this.getBackgroundDrawn())
		{
			this.drawModels();
			this.setBackgroundDrawn(true);
		}
		var modelsChange2Apply = volary.modelsChangesEndedGet();
		var canvasDocumentElement = this.getCanvasDocumentElement();
		var ctx = canvasDocumentElement.getContext("2d");
		var canvasImageData = this.getCanvasImageData();
/*		var backgroundColor = this.getBackgroundColor();
		if(backgroundColor)
		{
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, this.getWidth(), this.getHeight());	
		}
*/
/*
		var index;
		var model;
		var pixel;
        var imageDataIndex;
//        var r,g,b,a;
        var positionView = this.getPosition();
        var positionModel;
        var x, y;
//        var random = 0;
//        for(i = 0; i < myImageData.data.length / 4; ++i)
//        {
//        	x = i % gog.fields.canvas.width;
//        	y = Math.floor(i / gog.fields.canvas.width);
//            r = myImageData.data[4*i + 0];
//            g = myImageData.data[4*i + 1];
//            b = myImageData.data[4*i + 2];
//            a = myImageData.data[4*i + 3];
		
		for(index = 0; index < volary.models.length; ++index)
		{
			model = volary.models[index];
			if(modelsChange2Apply == model.getModelsChange())
			{
				positionModel = model.getPosition();
				if(this.isPointWithin(positionModel))
				{
					x = positionModel.x - positionView.x;
					y = positionModel.y - positionView.y;
					imageDataIndex = 4*(x + y * this.getWidth());
					pixel = model.drawPixel(this, positionModel);
					canvasImageData.data[imageDataIndex + 0] = pixel.r;
					canvasImageData.data[imageDataIndex + 1] = pixel.g;
					canvasImageData.data[imageDataIndex + 2] = pixel.b;
					canvasImageData.data[imageDataIndex + 3] = pixel.a;
				}
			}
		}
*/
//		ctx.fillStyle = "#FF0000FF";
//		ctx.fillRect(0, 0, this.getWidth(), this.getHeight());	

		ctx.putImageData(canvasImageData, 0, 0);
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
	this.changeModelStart();
	this.volary = volary;
	this.changeModelEnd();
}

VolaryPixel.prototype.getModelsChange = function()
{
	return this.modelsChange;
}

VolaryPixel.prototype.changeModelStart = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		this.modelsChange = volary.modelsChangesStartedGet();
		volary.onModelChangeStarted(this);
	}
}

VolaryPixel.prototype.changeModelEnd = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		volary.onModelChangeEnded(this);
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
	return {x:this.position.x, y:this.position.y};
}

VolaryPixel.prototype.setPosition = function(position)
{
	this.changeModelStart();
	this.position = position;
	this.changeModelEnd();
}

VolaryPixel.prototype.getX = function()
{
	return this.position.x;
}

VolaryPixel.prototype.setX = function(x)
{
	this.changeModelStart();
	this.position.x = x;
	this.changeModelEnd();
}

VolaryPixel.prototype.getY = function()
{
	return this.position.y;
}

VolaryPixel.prototype.setY = function(y)
{
	this.changeModelStart();
	this.position.y = y;
	this.changeModelEnd();
}

VolaryPixel.prototype.setSize = function(size)
{
	this.changeModelStart();
	this.size = size;
	this.changeModelEnd();
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
	this.changeModelStart();
	this.size.w = width;
	this.changeModelEnd();
}

VolaryPixel.prototype.getHeight = function()
{
	return this.size.h;
}

VolaryPixel.prototype.setHeight = function(height)
{
	this.changeModelStart();
	this.size.h = height;
	this.changeModelEnd();
}

VolaryPixel.prototype.getDepth = function()
{
	return this.depth;
}

VolaryPixel.prototype.setDepth = function(depth)
{
	this.changeModelStart();
	this.depth = depth;
	this.changeModelEnd();
}

VolaryPixel.prototype.getColor = function()
{
	return this.color;
}

VolaryPixel.prototype.setColor = function(color)
{
	this.changeModelStart();
	this.color = color;
	this.changeModelEnd();
}

VolaryPixel.prototype.drawPixel = function(view, position, pixel, models)
{
	var thisColor = this.getColor();
	var thisPosition = this.getPosition();
	var result = pixel;
	if(thisColor)
	{
		if(thisPosition.x == position.x
			&& thisPosition.y == position.y)
		{
			result = thisColor;
		}
	}
	return result;
/*	if(thisColor)
	{
		var thisPosition = this.getPosition();
		var isWithin = view.isPointWithin(thisPosition);
		if(isWithin)
		{
			var viewPosition = view.getPosition();
			var x = thisPosition.x-viewPosition.x;
			var y = thisPosition.y-viewPosition.y;
			ctx.fillStyle = thisColor;
			ctx.fillRect(thisPosition.x-viewPosition.x, thisPosition.y-viewPosition.y, this.getWidth(), this.getHeight());	
		}
	}
*/
}