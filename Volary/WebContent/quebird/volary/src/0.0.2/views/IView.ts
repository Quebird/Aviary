module Volary {

    /**
     * View specification.
     */
    export interface IView extends IInstance, IBackgroundColor, IHeight, IWidth
    {
        /**
         * Constructs a canvas in the DOM.
         */
        constructCanvas();
        /**
         * Attaches this to the canvas with the specified id in the DOM. 
         */
        attachCanvas(elementId : string);
        /**
         * Detaches this from the canvas in the DOM.
         */
        detachCanvas();
        /**
         * Destructs the canvas.
         */
        destructCanvas();
        
        
    }

}