/// <reference path="AColor.ts" />
module Volary {

    /**
     * Default color implementation.
     */
    export class Color extends AColor {
        private static modelInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("Color", Color.modelInstanceIndex);
            Color.modelInstanceIndex++;
        }
    }
}

