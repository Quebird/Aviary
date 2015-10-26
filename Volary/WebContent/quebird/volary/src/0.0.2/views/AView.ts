/// <reference path="../instances/AInstance.ts" />
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/colors/Color.ts" />
/// <reference path="canvases/Canvas.ts" />
module Volary {

    /**
     * Abstract view implementation.
     */
    export abstract class AView extends AInstance implements IView {
        
        private canvas: ICanvas;
        protected getCanvas()
        {
            return this.canvas;
        }
        protected setCanvas(canvas: ICanvas)
        {
            this.canvas = canvas;
        }
        
        private location : IPosition;
        public getLocation() : IPosition
        {
            return this.location;
        }
        protected setLocation(location : IPosition)
        {
            this.location = location;
        }
        
        private extent : IPosition;
        public getExtent() : IPosition
        {
            return this.extent;
        }
        protected setExtent(extent : IPosition)
        {
            this.extent = extent;
        }
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
        public constructCanvas()
        {
            var canvas = new Canvas();
            canvas.createInDocument(this);
            this.setCanvas(canvas);
        }
        public attachCanvas(elementId : string)
        {
            var canvas = new Canvas();
            var element : HTMLCanvasElement;
            element = document.getElementById(elementId) as HTMLCanvasElement;
            this.getExtent().setX(element.width);
            this.getExtent().setY(element.height);
            canvas.attachToDocument(this, elementId);
            this.setCanvas(canvas);
        }
        public detachCanvas()
        {
            this.getCanvas().detachFromDocument(this);
            this.setCanvas(null);
        }
        public destructCanvas()
        {
            this.getCanvas().deleteFromDocument(this);
            this.setCanvas(null);
        }

    }
}

