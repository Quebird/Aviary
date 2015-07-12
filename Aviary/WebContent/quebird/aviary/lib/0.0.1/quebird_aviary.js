/**
 * 
 */

function Aviary()
{
	this.privates = 
	{
		version : "0.0.1",
		documentElementCanvas : undefined
	}
}

Aviary.prototype.constructor = Aviary;

Aviary.prototype.getVersion = function()
{
	return this.privates.version;
}


Aviary.prototype.canvasCreate = function(id)
{
	var element = undefined;
	
	element = document.createElement('canvas');
	element.id = id;
    document.getElementsByTagName('body') [0].appendChild(element);
    this.documentElementCanvas = element;
    
    this.canvasSetWidth(200);
    this.canvasSetHeight(100);
    
    return this.documentElementCanvas;
}

Aviary.prototype.canvasSetWidth = function(width)
{
	this.documentElementCanvas.width = width;
}

Aviary.prototype.canvasSetHeight = function(heigth)
{
	this.documentElementCanvas.height = heigth;
}

Aviary.prototype.canvasDrawNow = function()
{
	var ctx = this.documentElementCanvas.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(0,0,150,75);	
}