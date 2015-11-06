/// <reference path="../instances/positions/IPosition.ts" />
module Volary {

    /**
     * Extent Property specification.
     */
    export interface IExtentProperty
    {
       /**
        * Retrieves the extent (width, height, depth).
        */
       //getExtent() : IPosition;
       width : number;
       height : number;
       depth : number;
    }

}