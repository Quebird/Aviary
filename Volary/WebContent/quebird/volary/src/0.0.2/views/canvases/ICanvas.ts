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
        
        drawStart(caller : IView) : ImageData;
        drawEnd(caller : IView, imageData : ImageData) : void;
    }

}