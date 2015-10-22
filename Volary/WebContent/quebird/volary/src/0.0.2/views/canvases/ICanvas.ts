/// <reference path="../IView.ts" />
module Volary {

    /**
     * Canvas specification.
     */
    export interface ICanvas extends IInstance 
    {
        createInDocument(caller : IView);
        attachToDocument(caller : IView, elementId : string);
        detachFromDocument(caller : IView);
        deleteFromDocument(caller : IView);
    }

}