/// <reference path="../instances/IInstance.ts" />
/// <reference path="../properties/ILocationProperty.ts" />
/// <reference path="../properties/IExtentProperty.ts" />
/// <reference path="../models/IModelObserver.ts" />
module Volary {

    /**
     * View specification.
     */
    export interface IView extends IInstance, ILocationProperty, IExtentProperty, IModelObserver
    {
        /**
         * Constructs a canvas in the DOM.
         */
        constructCanvas() : void;
        /**
         * Attaches this to the canvas with the specified id in the DOM. 
         */
        attachCanvas(elementId : string) : void;
        /**
         * Detaches this from the canvas in the DOM.
         */
        detachCanvas() : void;
        /**
         * Destructs the canvas.
         */
        destructCanvas() : void;
        
        /**
         * Draws the view.
         */
        draw() : void;
        
        /**
         * Retrieves number of draw calls this view.
         */
        getDrawCount() : number;
        
    }

}