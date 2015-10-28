/// <reference path="../instances/AInstance.ts" />
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/colors/Color.ts" />
/// <reference path="canvases/Canvas.ts" />
module Volary {

    /**
     * Abstract view implementation.
     */
    export abstract class AView extends AInstance implements IView {
        
        private canvasOrNull: ICanvas = null;
        protected getCanvasOrNull() : ICanvas
        {
            return this.canvasOrNull;
        }
        protected setCanvasOrNull(canvasOrNull: ICanvas) : void
        {
            this.canvasOrNull = canvasOrNull;
        }
        
        private location : IPosition;
        public getLocation() : IPosition
        {
            return this.location;
        }
        protected setLocation(location : IPosition) : void
        {
            this.location = location;
        }
        
        private extent : IPosition;
        public getExtent() : IPosition
        {
            return this.extent;
        }
        protected setExtent(extent : IPosition) : void
        {
            this.extent = extent;
        }
        
        private drawCount : number = 0;
        public getDrawCount() : number
        {
            return this.drawCount;
        }
        protected setDrawCount(drawCount : number) : void
        {
            this.drawCount = drawCount;
        }

        private observedModels: Array<IModel> = new Array<IModel>();
        protected getObservedModels() : Array<IModel>
        {
            return this.observedModels;
        }
        protected setObservedModels(observedModels : Array<IModel>) : void
        {
            this.observedModels = observedModels;
        }

        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number) : void
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
        public constructCanvas() : void
        {
            var canvas = new Canvas();
            canvas.createInDocument(this);
            this.setCanvasOrNull(canvas);
        }
        public attachCanvas(elementId : string) : void
        {
            var canvas = new Canvas();
            var element : HTMLCanvasElement;
            element = document.getElementById(elementId) as HTMLCanvasElement;
            this.getExtent().setX(element.width);
            this.getExtent().setY(element.height);
            canvas.attachToDocument(this, elementId);
            this.setCanvasOrNull(canvas);
        }
        public detachCanvas() : void
        {
            this.getCanvasOrNull().detachFromDocument(this);
            this.setCanvasOrNull(null);
        }
        public destructCanvas() : void
        {
            this.getCanvasOrNull().deleteFromDocument(this);
            this.setCanvasOrNull(null);
        }
        
        public draw() : void
        {
            var canvasOrNull : ICanvas = this.getCanvasOrNull();
            var drawCount : number = this.getDrawCount();
            var imageData : ImageData;
            var models : Array<IModel> = this.getObservedModels();
            var modelIndex : number;
            var model : IModel;
            var pixel : IPixel;
            var pixelPosition : IPosition;
            var pixelPositionX : number;
            var pixelPositionY : number;
            var pixelColor : IColor;
            var imageDataIndex : number;
            var viewExtent : IPosition = this.getExtent();
            var viewExtentX : number = viewExtent.getX();        
            var viewExtentY : number = viewExtent.getY();        
        
            imageData = canvasOrNull.drawStart(this);
        
            { // TODO: make this better
                for(modelIndex = 0; modelIndex < models.length; ++modelIndex)
                {
                    model = models[modelIndex];
                    pixel = model as IPixel;
                    if(pixel)
                    {
                        pixelPosition = pixel.getLocation();
                        pixelPositionX = pixelPosition.getX();
                        pixelPositionY = pixelPosition.getY();
                        if(pixelPositionX < viewExtentX 
                            && pixelPositionY < viewExtentX)
                        {
                            pixelColor = pixel.getColor();
                            imageDataIndex = 4 * (pixelPositionY * viewExtentX + pixelPositionX);
                            {
                                imageData.data[imageDataIndex + 0] = pixelColor.getR();
                                imageData.data[imageDataIndex + 1] = pixelColor.getG();
                                imageData.data[imageDataIndex + 2] = pixelColor.getB();
                                imageData.data[imageDataIndex + 3] = pixelColor.getA();
                            }
                        }
                    }
                }
            }
            
            canvasOrNull.drawEnd(this, imageData);
            {
                drawCount++;
                this.setDrawCount(drawCount);
            }
        }
        
        
        public startObservingModel(model : IModel) : void
        {
            var observedModels : Array<IModel> = this.getObservedModels();
            observedModels.push(model);
        }
        
        public isObservingModel(model : IModel) : Boolean
        {
            var observedModels : Array<IModel> = this.getObservedModels();
            var index = observedModels.indexOf(model);
            return 0 <= index;
        }
        
        public stopObservingModel(model : IModel) : void
        {
            var observedModels : Array<IModel> = this.getObservedModels();
            var index = observedModels.indexOf(model);
            observedModels.splice(index, 1);
        }

//        protected calculateImageDataIndex(position : IPosition, extent : IPosition) : number
//        {
//            var x : number = position.getX();
//            var y : number = position.getY();
//            var width : number = extent.getX();
//            return 4 * (y * width + x);
//        }

    }
}

