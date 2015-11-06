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
        volaryOrNull : IVolary;
        viewsOrNull : IViews;

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

        x : number;
        y : number;
        z : number;
        changeXyz(color : {x?:number, y?:number, z?:number}) : void;
        
        width : number;
        height : number;
        depth : number;
        changeWidthHeightDepth(color : {width?:number, height?:number, depth?:number}) : void;

        r : number;
        g : number;
        b : number;
        a : number;
        changeRgba(color : {r?:number, g?:number, b?:number, a?:number}) : void;
        
        /**
         * Retrieves number of draw calls this view.
         */
        getDrawCount() : number;
        
        pointsAdded : Array<IPoints>;
        pointsChanged : Array<IPoints>;
        pointsRemoved : Array<IPoints>;
        
        onPointsAdded(caller : IPoints) : void;
        onPointsChanged(caller : IPoints) : void;
        onPointsRemoved(caller : IPoints) : void;
        
    }

}