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
        protected getContext() : CanvasRenderingContext2D
        {
            return this.context;
        }
        protected setContext(context : CanvasRenderingContext2D)
        {
            this.context = context;
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
            element = document.createElement('canvas');
            element.id = this.getId();
            element.width = caller.getExtent().getX();
            element.height = caller.getExtent().getY();
            document.getElementsByTagName('body') [0].appendChild(element);
            this.setElement(element);
            context = element.getContext("2d");
            this.setContext(context);
//            context.fillStyle = caller.getBackgroundColor().getRgbaString();
//            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
        }
        
        public attachToDocument(caller : IView, elementId : string)
        {
            var element : HTMLCanvasElement;
            var context : CanvasRenderingContext2D;
            element = document.getElementById(elementId) as HTMLCanvasElement;
            this.setId(elementId);
//            caller.setHeight(element.height);
//            caller.setWidth(element.width);
            this.setElement(element);
            context = element.getContext("2d");
            this.setContext(context);
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
    }
}

