/**
 * Volary - Root Object 
 */

function Volary()
{
	this.version = "0.0.1";
	this.id = undefined;
	this.models = [];
	this.modelsChanged = [];
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
		this.models.splice(index, 1);
		model.setVolary(undefined);
		success = true;
	}
	
	return success;
}

Volary.prototype.modelChangeStart = function(model)
{
	var index;
	var view;
	var length = this.views.length;
//	var startedIndex = this.modelsChanged.indexOf(model);
//	if(startedIndex < 0)
	{
		for(index = 0; index < length; ++index)
		{
			view = this.views[index];
			view.eraseModel(model);
		}
		this.modelsChanged.push(model);
	}
}

Volary.prototype.modelChangeEnd = function(model)
{
	var index;
	var view;
	var length = this.views.length;
	for(index = 0; index < length; ++index)
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
	var index;
	var model;
	var length = this.modelsChanged.length;
	//while(0 < this.modelsChanged.length)
	for(index = 0; index < length; ++index)
	{
		//model = this.modelsChanged[0];
		model = this.modelsChanged.pop(); // this is cheap in FF
		//this.modelsChanged.splice(0, 1); // this is expensive in FF
		model.changeModelEnd();
	}
	
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
		this.views.splice(index, 1);
		view.setVolary(undefined);
		success = true;
	}
	
	return success;
}

Volary.prototype.viewsDraw = function()
{
	var index;
	var view;
	var length = this.views.length;
	for(index = 0; index < length; ++index)
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
		backgroundDrawn : false,
		ctx				: undefined
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
		this.setCanvasContext(ctx);
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

VolaryView.prototype.getCanvasContext = function()
{
	return this.canvas.ctx;
}

VolaryView.prototype.setCanvasContext = function(canvasContext)
{
	this.canvas.ctx = canvasContext;
}

VolaryView.prototype.getPosition = function(positionOut)
{
	if(!positionOut)
	{
		positionOut = {x : undefined, y : undefined};
	}
	positionOut.x = this.position.x;
	positionOut.y = this.position.y;
	return positionOut;
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

VolaryView.prototype.getSize = function(sizeOut)
{
	if(!sizeOut)
	{
		sizeOut = {w : undefined, h : undefined};
	}
	sizeOut.w = this.size.w;
	sizeOut.h = this.size.h;
	return sizeOut;
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

VolaryView.prototype.getBackgroundColor = function(colorOut)
{
	if(!this.canvas.backgroundColor)
	{
		colorOut = undefined;
	}
	else
	{
		if(!colorOut)
		{
			colorOut =
			{
				r : this.canvas.backgroundColor.r,
				g : this.canvas.backgroundColor.g,
				b : this.canvas.backgroundColor.b,
				a : this.canvas.backgroundColor.a
			};
		}
		else
		{
			colorOut.r = this.canvas.backgroundColor.r;
			colorOut.g = this.canvas.backgroundColor.g;
			colorOut.b = this.canvas.backgroundColor.b;
			colorOut.a = this.canvas.backgroundColor.a;
		}
	}
	
	return colorOut;
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
		//var ctx = canvasDocumentElement.getContext("2d");
		var ctx = this.getCanvasContext();
		var canvasImageData = this.getCanvasImageData();
		var backgroundColor = this.getBackgroundColor();
        var imageDataIndex;
		var pixel = {r:0,g:0,b:0,a:0};
        var positionView = this.getPosition();
        var positionModel = {x : undefined, y : undefined};
        var x, y;
        var canvasImageModelIndex = -1;
        var canvasImageModelEntries;
        var canvasImageModelEntriesLength;
        var model2Draw;
		
		if(modelsChange2Apply == model.getModelsChange())
		{
			positionModel = model.getPosition(positionModel);
			if(this.isPointWithin(positionModel))
			{
				x = positionModel.x - positionView.x;
				y = positionModel.y - positionView.y;
				canvasImageModelEntries = canvasImageModels[x][y];
				var canvasImageModelIndex = canvasImageModelEntries.indexOf(model);
				if(0 <= canvasImageModelIndex)
				{
					canvasImageModels[x][y].splice(canvasImageModelIndex, 1);
				}
				
				pixel.r = 0;
				pixel.g = 0;
				pixel.b = 0;
				pixel.a = 0;
				if(backgroundColor)
				{
					pixel.r = backgroundColor.r;
					pixel.g = backgroundColor.g;
					pixel.b = backgroundColor.b;
					pixel.a = backgroundColor.a;
				}
				canvasImageModelEntriesLength = canvasImageModelEntries.length;
				for(canvasImageModelIndex = 0; canvasImageModelIndex < canvasImageModelEntriesLength; ++canvasImageModelIndex)
				{
					model2Draw = canvasImageModelEntries[canvasImageModelIndex];
					pixel = model2Draw.drawPixel(this, positionModel, pixel, canvasImageModelEntries);
				}
				imageDataIndex = 4*(x + y * this.getWidth());
				
				canvasImageData.data[imageDataIndex + 0] = pixel.r;
				canvasImageData.data[imageDataIndex + 1] = pixel.g;
				canvasImageData.data[imageDataIndex + 2] = pixel.b;
				canvasImageData.data[imageDataIndex + 3] = pixel.a;
				
				//volary1.viewsDraw();

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
//		var ctx = canvasDocumentElement.getContext("2d");
		var ctx = this.getCanvasContext();
		var canvasImageData = this.getCanvasImageData();
		var backgroundColor = this.getBackgroundColor();
        var imageDataIndex;
		var pixel = {r:0,g:0,b:0,a:0};
        var positionView = this.getPosition();
        var positionModel = {x : undefined, y : undefined};
        var x, y;
        var canvasImageModelIndex = -1;
        var canvasImageModelEntries;
        var canvasImageModelEntriesLength;
        var model_;
		
		if(modelsChange2Apply == model.getModelsChange())
		{
			positionModel = model.getPosition(positionModel);
			if(this.isPointWithin(positionModel))
			{
				x = positionModel.x - positionView.x;
				y = positionModel.y - positionView.y;
				
				canvasImageModelEntries = canvasImageModels[x][y];
				var canvasImageModelIndex = canvasImageModelEntries.indexOf(model);
				if(canvasImageModelIndex < 0)
				{
					canvasImageModelIndex = 0;
			        var canvasImageModelEntriesLength = canvasImageModelEntries.length;
					for(canvasImageModelIndex = 0; canvasImageModelIndex < canvasImageModelEntriesLength; ++canvasImageModelIndex)
					{
						model_ = canvasImageModelEntries[canvasImageModelIndex];
						if(model.getDepth() <= model_.getDepth())
						{
							// move on - will be drawn later
						}
						else
						{
							break;
						}
					}
					canvasImageModels[x][y].splice(canvasImageModelIndex, 0, model);
				}
				pixel.r = 0;
				pixel.g = 0;
				pixel.b = 0;
				pixel.a = 0;
				if(backgroundColor)
				{
					pixel.r = backgroundColor.r;
					pixel.g = backgroundColor.g;
					pixel.b = backgroundColor.b;
					pixel.a = backgroundColor.a;
				}
				var canvasImageModelEntriesLength = canvasImageModelEntries.length;
				for(canvasImageModelIndex = 0; canvasImageModelIndex < canvasImageModelEntriesLength; ++canvasImageModelIndex)
				{
					model_ = canvasImageModelEntries[canvasImageModelIndex];
					pixel = model_.drawPixel(this, positionModel, pixel, canvasImageModelEntries);
				}
				imageDataIndex = 4*(x + y * this.getWidth());
				
				canvasImageData.data[imageDataIndex + 0] = pixel.r;
				canvasImageData.data[imageDataIndex + 1] = pixel.g;
				canvasImageData.data[imageDataIndex + 2] = pixel.b;
				canvasImageData.data[imageDataIndex + 3] = pixel.a;
				
				//volary1.viewsDraw();

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
//		var ctx = canvasDocumentElement.getContext("2d");
		var ctx = this.getCanvasContext();
		var canvasImageData = this.getCanvasImageData();
		var backgroundColor = this.getBackgroundColor();
        var imageDataIndex;
		var pixel = {r:0,g:0,b:0,a:0};
        var positionView = this.getPosition();
        var positionModel = {x : undefined, y : undefined};
        var x, y, w, h;
        w = this.getWidth();
        h = this.getHeight();
        var canvasImageModelIndex = -1;
        var canvasImageModelEntries;
        var canvasImageModelEntriesLength;
        for(x = 0; x < w; ++x)
		{
        	for(y = 0; y < h; ++y)
        	{
        		canvasImageModelEntries = canvasImageModels[x][y];
				pixel.r = 0;
				pixel.g = 0;
				pixel.b = 0;
				pixel.a = 0;
				if(backgroundColor)
				{
					pixel.r = backgroundColor.r;
					pixel.g = backgroundColor.g;
					pixel.b = backgroundColor.b;
					pixel.a = backgroundColor.a;
				}
		        var canvasImageModelEntriesLength = canvasImageModelEntries.length;
				for(canvasImageModelIndex = 0; canvasImageModelIndex < canvasImageModelEntriesLength; ++canvasImageModelIndex)
				{
					model = canvasImageModelEntries[canvasImageModelIndex];
					positionModel = model.getPosition(positionModel);
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
//		var ctx = canvasDocumentElement.getContext("2d");
		var ctx = this.getCanvasContext();
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
 * Abstract object. 
 */
function AVolaryObject()
{
	this.id = undefined;
	this.volary = undefined;
}

AVolaryObject.prototype.getID = function()
{
	return this.id;
}
AVolaryObject.prototype.setID = function(id)
{
	this.id = id;
}

AVolaryObject.prototype.getVolary = function()
{
	return this.volary;
}
AVolaryObject.prototype.setVolary = function(volary)
{
	this.volary = volary;
}

AVolaryObject.prototype.logIfNaN = function(data, name)
{
	if(isNaN(data))
	{
		console.log('data ' + name + 'is NaN');
	};
}
AVolaryObject.prototype.logIfUndefined = function(data, name)
{
	if(typeof data === "undefined")
	{
		console.log('data ' + name + 'is NaN');
	};
}
AVolaryObject.prototype.logIfUndefinedOrNaN = function(data, name)
{
	this.logIfUndefined(data, name);
	this.logIfNaN(data, name);
}


/**
 * Abstract model. 
 */
function AVolaryModel()
{
	AVolaryObject.call(this);

	this.modelsChange = 0;
}

AVolaryModel.prototype = Object.create(AVolaryObject.prototype);

AVolaryModel.prototype.constructor = AVolaryModel;

AVolaryModel.prototype.setVolary = function(volary)
{
	this.changeModelStart();
	AVolaryObject.prototype.setVolary.call(this, volary);
	this.changeModelEnd();
}

AVolaryModel.prototype.getModelsChange = function()
{
	return this.modelsChange;
}

AVolaryModel.prototype.setModelsChange = function(modelsChange)
{
	this.modelsChange = modelsChange;
}

AVolaryModel.prototype.changeModelStart = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		var modelsChange = this.getModelsChange();
		var modelChangesStarted = volary.modelsChangesStartedGet();
		if(modelsChange != modelChangesStarted)
		{
			if(modelsChange - modelChangesStarted == 0)
			{
				alert('wtf ' + typeof(modelsChange) + ' ' + typeof(modelsChangeStarted));
			}
			this.setModelsChange(modelChangesStarted);
			volary.modelChangeStart(this);
		}
	}
}

AVolaryModel.prototype.changeModelEnd = function()
{
	var volary = this.getVolary();
	if(volary)
	{
		volary.modelChangeEnd(this);
	}
}



/**
 * Point - Model Object (that also can draw itself)
 */
function VolaryPixel()
{
	//this.id = undefined;
	AVolaryModel.call(this);
	

	this.position = 
	{
		x : undefined,
		y : undefined
	};
	this.positionObservers = [];
	this.size =
	{
		w : 1,
		h : 1
	}
	this.depth = 0;
	this.color = 
	{
		r : undefined,
		g : undefined,
		b : undefined,
		a : undefined
	};
}

VolaryPixel.prototype = Object.create(AVolaryModel.prototype);

VolaryPixel.prototype.constructor = VolaryPixel;



VolaryPixel.prototype.getPosition = function(positionOut)
{
	if(!positionOut)
	{
		positionOut = {x : this.position.x, y : this.position.y};
	}
	else
	{
		positionOut.x = this.position.x;
		positionOut.y = this.position.y;
	}
	return positionOut;
	//return {x:this.position.x, y:this.position.y};
}

VolaryPixel.prototype.setPosition = function(position)
{
	this.changeModelStart();
	this.logIfUndefined(position, 'position');
	this.logIfUndefinedOrNaN(position.x, 'position.x');
	this.logIfUndefinedOrNaN(position.y, 'position.y');
	this.position.x = position.x;
	this.position.y = position.y;
	this.notifyPositionObservers(this.position);
//	this.changeModelEnd();
}

VolaryPixel.prototype.getX = function()
{
	return this.position.x;
}

VolaryPixel.prototype.setX = function(x)
{
	this.changeModelStart();
	this.logIfUndefinedOrNaN(x, 'x');
	this.position.x = x;
	this.notifyPositionObservers(this.position);
//	this.changeModelEnd();
}

VolaryPixel.prototype.getY = function()
{
	return this.position.y;
}

VolaryPixel.prototype.setY = function(y)
{
	this.changeModelStart();
	this.logIfUndefinedOrNaN(y, 'y');
	this.position.y = y;
	this.notifyPositionObservers(this.position);
//	this.changeModelEnd();
}

VolaryPixel.prototype.addPositionObserver = function(observer)
{
	var success = false;
	
	var index = this.positionObservers.indexOf(observer);
	if(index < 0)
	{
		this.positionObservers.push(observer);
		success = true;
	}
	
	return success;
}

VolaryPixel.prototype.removePositionObserver = function(observer)
{
	var success = false;
	
	var index = this.positionObservers.indexOf(observer);
	if(0 <= index)
	{
		this.positionObservers.splice(index, 1);
		success = true;
	}
	
	return success;
}

VolaryPixel.prototype.notifyPositionObservers = function(position)
{
	var observer = undefined;
	var length = this.positionObservers.length;
	//while(0 < this.modelsChanged.length)
	for(index = 0; index < length; ++index)
	{
		observer = this.positionObservers[index];
		observer.onModelPositionChange(this, position);
	}
}

VolaryPixel.prototype.setSize = function(size)
{
	this.logIfUndefined(size, 'size');
	this.setWidth(size.w);
	this.setHeight(size.h);
//	this.changeModelEnd();
}

VolaryPixel.prototype.getSize = function(sizeOut)
{
	if(!sizeOut)
	{
		sizeOut = {w: this.size.w, h : this.size.h};
	}
	else
	{
		sizeOut.w = this.size.w;
		sizeOut.h = this.size.h;
	}
	return sizeOut;//{ w : this.size.w, h : this.size.h };
}

VolaryPixel.prototype.getWidth = function()
{
	return this.size.w;
}

VolaryPixel.prototype.setWidth = function(width)
{
	this.changeModelStart();
	this.logIfUndefinedOrNaN(width, 'width');
	this.size.w = width;
//	this.changeModelEnd();
}

VolaryPixel.prototype.getHeight = function()
{
	return this.size.h;
}

VolaryPixel.prototype.setHeight = function(height)
{
	this.changeModelStart();
	this.logIfUndefinedOrNaN(height, 'height');
	this.size.h = height;
//	this.changeModelEnd();
}

VolaryPixel.prototype.getDepth = function()
{
	return this.depth;
}

VolaryPixel.prototype.setDepth = function(depth)
{
	this.changeModelStart();
	this.logIfUndefinedOrNaN(depth, 'depth');
	this.depth = depth;
//	this.changeModelEnd();
}

VolaryPixel.prototype.getColor = function(colorOut)
{
	if(!colorOut)
	{
		colorOut =
		{
			r : this.color.r,
			g : this.color.g,
			b : this.color.b,
			a : this.color.a
		};
	}
	else
	{
		colorOut.r = this.color.r;
		colorOut.g = this.color.g;
		colorOut.b = this.color.b;
		colorOut.a = this.color.a;
	}
	return colorOut;
}

VolaryPixel.prototype.setColor = function(color)
{
	this.changeModelStart();
	this.logIfUndefinedOrNaN(color.r, 'color.r');
	this.logIfUndefinedOrNaN(color.g, 'color.g');
	this.logIfUndefinedOrNaN(color.b, 'color.b');
	this.logIfUndefinedOrNaN(color.a, 'color.a');
	this.color.r = color.r;
	this.color.g = color.g;
	this.color.b = color.b;
	this.color.a = color.a;
//	this.changeModelEnd();
}

VolaryPixel.prototype.drawPixel = function(view, position, pixelOut, models)
{
	var r1 = pixelOut.r;
	var g1 = pixelOut.g;
	var b1 = pixelOut.b;
	var a1 = pixelOut.a;
	var r2, g2, b2, a2, k;
	pixelOut = this.getColor(pixelOut);
	r2 = pixelOut.r;
	g2 = pixelOut.g;
	b2 = pixelOut.b;
	a2 = pixelOut.a;
	k = (a2 / 255.0);
	pixelOut.r = Math.round((1.0-k)*r1 + k*r2);
	pixelOut.g = Math.round((1.0-k)*g1 + k*g2);
	pixelOut.b = Math.round((1.0-k)*b1 + k*b2);
	pixelOut.a = Math.round((1.0-k)*a1 + k*a2);
	
	
	//var thisPosition = this.getPosition();
	return pixelOut;
/*	var result = pixelOut;
	if(thisColor)
	{
		if(thisPosition.x == position.x
			&& thisPosition.y == position.y)
		{
			result = thisColor;
		}
	}
	return result;
*/
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



/**
 * Pixel Link - Model Object
 */
function VolaryPixelLink()
{
	//this.id = undefined;
	AVolaryModel.call(this);
	
	this.target = undefined;
	this.chaser = undefined;

	this.deltaPosition = 
	{
		x : undefined,
		y : undefined
	};
}

VolaryPixelLink.prototype = Object.create(AVolaryModel.prototype);

VolaryPixelLink.prototype.constructor = VolaryPixelLink;

VolaryPixelLink.prototype.getDeltaPosition = function(deltaPositionOut)
{
	if(!deltaPositionOut)
	{
		deltaPositionOut = {x : this.deltaPosition.x, y : this.deltaPosition.y};
	}
	else
	{
		deltaPositionOut.x = this.deltaPosition.x;
		deltaPositionOut.y = this.deltaPosition.y;
	}
	return deltaPositionOut;
	//return {x:this.position.x, y:this.position.y};
}

VolaryPixelLink.prototype.setDeltaPosition = function(deltaPosition)
{
	this.deltaPosition.x = deltaPosition.x;
	this.deltaPosition.y = deltaPosition.y;
}

VolaryPixelLink.prototype.getDeltaX = function()
{
	return this.deltaPosition.x;
}

VolaryPixelLink.prototype.setDeltaX = function(x)
{
	this.deltaPosition.x = x;
}

VolaryPixelLink.prototype.getDeltaY = function()
{
	return this.deltaPosition.y;
}

VolaryPixelLink.prototype.setDeltaY = function(y)
{
	this.deltaPosition.y = y;
}

VolaryPixelLink.prototype.establishLink = function(target, chaser)
{
	this.target = target;
	this.target.addPositionObserver(this);
	this.chaser = chaser;
}

VolaryPixelLink.prototype.breakLink = function()
{
	this.target.removePositionObserver(this);
	this.target = null;
	this.chaser = null;
}

VolaryPixelLink.prototype.onModelPositionChange = function(model, position)
{
	if(model == this.target)
	{
		if(this.chaser)
		{
			var chaserPosition = {x : undefined, y : undefined};
			chaserPosition.x = position.x + this.deltaPosition.x;
			chaserPosition.y = position.y + this.deltaPosition.y;
			this.chaser.setPosition(chaserPosition);
		}
	}
}

/**
 * PixelGroup - Object
 */
function VolaryPixelGroup()
{
	//this.id = undefined;
	AVolaryObject.call(this);

	this.pixelGroup = [];
}

VolaryPixelGroup.prototype = Object.create(AVolaryObject.prototype);

VolaryPixelGroup.prototype.constructor = VolaryPixelGroup;

VolaryPixelGroup.prototype.addPixel = function(volaryPixel)
{
	var success = false;
	
	var index = this.pixelGroup.indexOf(volaryPixel);
	if(index < 0)
	{
		this.pixelGroup.push(volaryPixel);
		success = true;
	}
	
	return success;
}

VolaryPixelGroup.prototype.removePixel = function(volaryPixel)
{
	var success = false;
	
	var index = this.models.indexOf(volaryPixel);
	if(0 <= index)
	{
		this.pixelGroup.splice(index, 1);
		success = true;
	}
	
	return success;
}

VolaryPixelGroup.prototype.translate = function(deltaX, deltaY, deltaZOrUndefined)
{
	var volaryPixel = undefined;
	var length = this.pixelGroup.length;
	var index = 0;
	if(typeof deltaZOrUndefined === "undefined")
	{
		for(index = 0; index < length; ++index)
		{
			volaryPixel = this.pixelGroup[index];
			volaryPixel.setX(volaryPixel.getX() + deltaX);
			volaryPixel.setY(volaryPixel.getY() + deltaY);
		}
	}
	else
	{
		for(index = 0; index < length; ++index)
		{
			volaryPixel = this.pixelGroup[index];
			volaryPixel.setX(volaryPixel.getX() + deltaX);
			volaryPixel.setY(volaryPixel.getY() + deltaY);
			volaryPixel.setDepth(volaryPixel.getDepth() + deltaZOrUndefined);
		}
	}
}


/**
 * VolaryTranslate - Object
 */
function VolaryTranslate()
{
	//this.id = undefined;
	AVolaryObject.call(this);
	
	this.pixelGroup = undefined;
	this.durationMS = 0;
	this.deltaX = 0;
	this.deltaY = 0;
	this.deltaZ = 0;
//	this.repeat = false;
	this.bounce = true;
	this.done = true;
	this.durationCurrentMS = 0;
	this.deltaXCurrent = 0;
	this.deltaYCurrent = 0;
	this.deltaZCurrent = 0;
	this.bouncing = 1;
}

VolaryTranslate.prototype = Object.create(AVolaryObject.prototype);

VolaryTranslate.prototype.constructor = VolaryPixelGroup;

VolaryTranslate.prototype.getPixelGroup = function()
{
	return this.pixelGroup;
}
VolaryTranslate.prototype.setPixelGroup = function(pixelGroup)
{
	this.pixelGroup = pixelGroup;
}

VolaryTranslate.prototype.getDeltaX = function()
{
	return this.deltaX;
}
VolaryTranslate.prototype.setDeltaX = function(deltaX)
{
	this.deltaX = deltaX;
}

VolaryTranslate.prototype.getDeltaY = function()
{
	return this.deltaY;
}
VolaryTranslate.prototype.setDeltaY = function(deltaY)
{
	this.deltaY = deltaY;
}

VolaryTranslate.prototype.getDurationMS = function()
{
	return this.durationMS;
}
VolaryTranslate.prototype.setDurationMS = function(durationMS)
{
	this.durationMS = durationMS;
}

VolaryTranslate.prototype.getBounce = function()
{
	return this.bounce;
}
VolaryTranslate.prototype.setBounce = function(repeat)
{
	this.bounce = bounce;
}

VolaryTranslate.prototype.getDone = function()
{
	return this.done;
}
VolaryTranslate.prototype.setDone = function(done)
{
	this.done = done;
}

//VolaryTranslate.prototype.getRepeat = function()
//{
//	return this.repeat;
//}
//VolaryTranslate.prototype.setRepeat = function(repeat)
//{
//	this.repeat = repeat;
//}

VolaryTranslate.prototype.update = function(deltaTimeMS)
{
	var loop = true;
	var durationCurrentMSNew;
	var deltaXToApply = 0;
	var deltaYToApply = 0;
	var k = 0;
	if(!this.done)
	{
		durationCurrentMSNew = this.durationCurrentMS + deltaTimeMS;
		while(loop)
		{
			if(this.durationMS <= durationCurrentMSNew)
			{
				durationCurrentMSNew -= this.durationMS;
				this.durationCurrentMS = durationCurrentMSNew;
				if(this.bouncing < 0)
				{
					deltaXToApply += -this.deltaXCurrent;
					deltaYToApply += -this.deltaYCurrent;
					this.deltaXCurrent = 0;
					this.deltaYCurrent = 0;
				}
				else
				{
					deltaXToApply += Math.floor(this.deltaX - this.deltaXCurrent);
					deltaYToApply += Math.floor(this.deltaY - this.deltaYCurrent);
					this.deltaXCurrent = this.deltaX;
					this.deltaYCurrent = this.deltaY;
				}
				if(this.bounce)
				{
					this.bouncing *= -1;
				}
			}
			else
			{
				this.durationCurrentMS = durationCurrentMSNew;
				// interpolate
				k = (this.durationCurrentMS / this.durationMS);
				if(this.bouncing < 0)
				{
					deltaXToApply += Math.ceil((1-k) * this.deltaX) - this.deltaXCurrent;
					deltaYToApply += Math.ceil((1-k) * this.deltaY) - this.deltaYCurrent;
					this.deltaXCurrent = Math.ceil((1-k) * this.deltaX);
					this.deltaYCurrent = Math.ceil((1-k) * this.deltaY);
				}
				else
				{
					deltaXToApply += Math.floor(k * this.deltaX) - this.deltaXCurrent;
					deltaYToApply += Math.floor(k * this.deltaY) - this.deltaYCurrent;
					this.deltaXCurrent = Math.floor(k * this.deltaX);
					this.deltaYCurrent = Math.floor(k * this.deltaY);
				}
				loop = false;
			}
		}
		
		var volaryPixel = undefined;
		var length = this.pixelGroup.pixelGroup.length;
		var index = 0;
	//	if(typeof deltaZOrUndefined === "undefined")
		{
			for(index = 0; index < length; ++index)
			{
				volaryPixel = this.pixelGroup.pixelGroup[index];
				volaryPixel.setX(volaryPixel.getX() + deltaXToApply);
				volaryPixel.setY(volaryPixel.getY() + deltaYToApply);
			}
		}
	}
}
