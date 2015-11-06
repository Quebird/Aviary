/// <reference path="../../instances/AInstance.ts" />
module Volary {

    /**
     * Abstract canvas implementation.
     */
    export abstract class ACanvas extends AInstance implements ICanvas {

        private element : HTMLCanvasElement;
        protected getElement() : HTMLCanvasElement
        {
            return this.element;
        }
        protected setElement(element: HTMLCanvasElement)
        {
            this.element = element;
        }
        
        private context : CanvasRenderingContext2D;
        public getContext() : CanvasRenderingContext2D
        {
            return this.context;
        }
        protected setContext(context : CanvasRenderingContext2D)
        {
            this.context = context;
        }
        
        private imageData : ImageData;
        protected getImageData() : ImageData
        {
            return this.imageData;
        }
        protected setImageData(imageData : ImageData) : void
        {
            this.imageData = imageData;
        }
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex);
        }

        public createInDocument(caller : IView)
        {
            var element : HTMLCanvasElement;
            var context : CanvasRenderingContext2D;
            var imageData : ImageData;
            var imageDataIndex : number;
            {
                element = document.createElement('canvas');
                element.id = this.getId();
//                element.width = caller.getExtent().getX();
//                element.height = caller.getExtent().getY();
                element.width = caller.width;
                element.height = caller.height;
                document.getElementsByTagName('body') [0].appendChild(element);
                this.setElement(element);
            }
            {
                context = element.getContext("2d");
                this.setContext(context);
            }
            {
//                imageData = context.createImageData(caller.getExtent().getX(), caller.getExtent().getY());
                imageData = context.createImageData(caller.width, caller.height);
                this.setImageData(imageData);
                this.resetImageData(caller.r, caller.g, caller.b, caller.a);

            }
//            context.fillStyle = caller.getBackgroundColor().getRgbaString();
//            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
        }
        
        public attachToDocument(caller : IView, elementId : string)
        {
            var element : HTMLCanvasElement;
            var context : CanvasRenderingContext2D;
            var imageData : ImageData;
            var imageDataIndex : number;
            {
                element = document.getElementById(elementId) as HTMLCanvasElement;
                this.setId(elementId);
                this.setElement(element);
            }
//            caller.setHeight(element.height);
//            caller.setWidth(element.width);
            {
                context = element.getContext("2d");
                this.setContext(context);
            }
            {
                //imageData = context.createImageData(caller.getExtent().getX(), caller.getExtent().getY());
                imageData = context.createImageData(caller.width, caller.height);
                this.setImageData(imageData);
                this.resetImageData(caller.r, caller.g, caller.b, caller.a);
            }
//            context.fillStyle = caller.getBackgroundColor().getRgbaString();
//            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
        }
        
        public detachFromDocument(caller : IView)
        {
            this.setContext(null);
            this.setElement(null);
        }
        
        public deleteFromDocument(caller : IView)
        {
            var element : HTMLCanvasElement = this.getElement();
            element.parentNode.removeChild(element);
            this.setContext(null);
            this.setElement(null);
        }
        
        public resize(width : number, height : number) : void
        {
            var element : HTMLCanvasElement;
            var imageData : ImageData;
            var context : CanvasRenderingContext2D;
            
            element = document.getElementById(this.getId()) as HTMLCanvasElement;
            element.width = width;
            element.height = height;
            context = this.getContext();
            imageData = context.createImageData(width, height);
            this.setImageData(imageData);
        }
        
        public resetImageData(r : number, g : number, b : number, a : number) : void
        {
            var imageData = this.getImageData();
            for(var imageDataIndex = 0; imageDataIndex < imageData.data.length; imageDataIndex += 4)
            {
                imageData.data[imageDataIndex + 0] = r;
                imageData.data[imageDataIndex + 1] = g;
                imageData.data[imageDataIndex + 2] = b;
                imageData.data[imageDataIndex + 3] = a;
            }
            
        }
        
        public drawStart(caller : IView) : ImageData
        {
            return this.getImageData();
        }
        
        public drawEnd(caller : IView, imageData : ImageData) : void
        {
            var context : CanvasRenderingContext2D = this.getContext();
            this.setImageData(imageData);
            context.putImageData(imageData, 0, 0);
        }
        
/*        public draw(caller : IView, models : Array<IModel>) : void
        {
            var context : CanvasRenderingContext2D = this.getContext();
            var imageData : ImageData = this.getImageData();
            var extent : IPosition = caller.getExtent();
            var imageDataPixelIndex = 4*(extent.getX()/2 + extent.getY()/2 * extent.getX());
            var modelIndex : number = 0;
            var model : IModel = null;
            var modelAsLocation : ILocationProperty = null;
            var modelAsColor : IColorProperty = null;
            
            for(modelIndex = 0; modelIndex < models.length; ++modelIndex)
            {
                model = models[modelIndex];
                modelAsLocation = model;
                
            }
            imageData.data[imageDataPixelIndex + 0] = 255;
            imageData.data[imageDataPixelIndex + 1] = 0;
            imageData.data[imageDataPixelIndex + 2] = 0;
            imageData.data[imageDataPixelIndex + 3] = 255;

            context.putImageData(imageData, 0, 0);
        }
*/        
    }
}

