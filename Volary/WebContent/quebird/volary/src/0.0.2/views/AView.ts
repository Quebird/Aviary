/// <reference path="../instances/AInstance.ts" />
/// <reference path="../instances/colors/Color.ts" />
/// <reference path="canvases/Canvas.ts" />
module Volary {

    /**
     * Abstract view implementation.
     */
    export abstract class AView extends AInstance implements IView {
        
        private canvas: ICanvas = null;
        protected getCanvas()
        {
            return this.canvas;
        }
        protected setCanvas(canvas: ICanvas)
        {
            this.canvas = canvas;
        }
        
        private backgroundColor : IColor = new Color();
        public getBackgroundColor() : IColor
        {
            return this.backgroundColor;
        }
        public setBackgroundColor(backgroundColor : IColor)
        {
            this.backgroundColor = backgroundColor;
        }
        
        private height : number = 0;
        public getHeight() : number
        {
            return this.height;
        }
        public setHeight(height: number)
        {
            this.height = height;
        }
        
        private width: number = 0;
        public getWidth() : number
        {
            return this.width;
        }
        public setWidth(width: number)
        {
            this.width = width;
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

