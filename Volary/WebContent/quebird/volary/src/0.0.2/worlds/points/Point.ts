/// <reference path="APoint.ts" />
module Volary {

    /**
     * Default point implementation.
     */
    export class Point extends APoint {
        private static pointInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("Point", Point.pointInstanceIndex);
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            this.pointsOrNull = null;
            Point.pointInstanceIndex++;
        }
    }
}

