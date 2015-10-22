/// <reference path="ACanvas.ts" />
module Volary {

    /**
     * Default canvas implementation.
     */
    export class Canvas extends ACanvas {
       private static canvasInstanceIndex: number = 0;
        constructor() {
            super();
            this.initInstance("Canvas", Canvas.canvasInstanceIndex);
            Canvas.canvasInstanceIndex++;
        }
    }
}

