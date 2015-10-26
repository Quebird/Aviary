/// <reference path="APosition.ts" />
module Volary {

    /**
     * Default Position implementation.
     */
    export class Position extends APosition {
        private static positionInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("Position", Position.positionInstanceIndex);
            this.setX(0);
            this.setY(0);
            this.setZ(0);
            Position.positionInstanceIndex++;
        }
    }
}

