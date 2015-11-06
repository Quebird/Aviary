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
            //this.setLocation(new Position());
            this.x = 0;
            this.y = 0;
            this.z = 0;
            //this.setColor(new Color());
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            this.frameModified = 0;
            this.modelsOrNull = null;
            Pixel.pixelInstanceIndex++;
        }
    }
}

