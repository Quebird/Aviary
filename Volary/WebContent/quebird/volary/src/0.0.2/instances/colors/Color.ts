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
            this.setR(0);
            this.setG(0);
            this.setB(0);
            this.setA(0);
            Color.modelInstanceIndex++;
        }
    }
}

