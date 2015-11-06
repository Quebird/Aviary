/// <reference path="../IView.ts" />
module Volary {

    /**
     * Canvas specification.
     */
    export interface ICanvas extends IInstance 
    {
        createInDocument(caller : IView) : void;
        attachToDocument(caller : IView, elementId : string) : void;
        detachFromDocument(caller : IView) : void;
        deleteFromDocument(caller : IView) : void;
        
        resize(width : number, height : number) : void;
        resetImageData(r : number, g : number, b : number, a : number) : void;
        drawStart(caller : IView) : ImageData;
        getContext() : CanvasRenderingContext2D;
        drawEnd(caller : IView, imageData : ImageData) : void;
    }

}