/// <reference path="APixel.ts" />
module Volary {

    /**
     * Default pixel implementation.
     */
    export class Pixel extends AModel {
        private static pixelInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("Pixel", Pixel.pixelInstanceIndex);
            Pixel.pixelInstanceIndex++;
        }
    }
}

