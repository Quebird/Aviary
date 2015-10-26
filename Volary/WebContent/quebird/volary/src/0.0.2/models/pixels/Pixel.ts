/// <reference path="APixel.ts" />
/// <reference path="../../instances/positions/Position.ts" />
/// <reference path="../../instances/colors/Color.ts" />
module Volary {

    /**
     * Default pixel implementation.
     */
    export class Pixel extends APixel {
        private static pixelInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("Pixel", Pixel.pixelInstanceIndex);
            this.setLocation(new Position());
            this.setColor(new Color());
            Pixel.pixelInstanceIndex++;
        }
    }
}

