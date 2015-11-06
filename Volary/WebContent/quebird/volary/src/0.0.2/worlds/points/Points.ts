/// <reference path="APoints.ts" />
module Volary {

    /**
     * Default points implementation.
     */
    export class Points extends APoints {
        private static pointsInstanceIndex: number = 0;
        constructor(volary: IVolary, world: IWorld, dx : number, dy : number) 
        {
            super();
            this.initInstance("Points", Points.pointsInstanceIndex);
            this.volary = volary;
            this.world = world;
            this.dx = dx;
            this.dy = dy;
            this.frameModfied = 0;
            this.points = new Array<IPoint>();
            this.observingViews = new Array<IView>();
            Points.pointsInstanceIndex++;
        }
    }
}

