/// <reference path="AView.ts" />
/// <reference path="../instances/positions/Position.ts" />
module Volary {

    /**
     * Default view implementation.
     */
    export class View extends AView {
        private static viewInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("View", View.viewInstanceIndex);
            this.volaryOrNull = null;
            this.viewsOrNull = null;
            this.setCanvasOrNull(null);
            //this.setLocation(new Position());
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            
            //this.setExtent(new Position());
            this.width = 0;
            this.height = 0;
            this.depth = 0;
            this.pointsChanged = new Array<IPoints>();
            this.pointsRemoved = new Array<IPoints>();
            View.viewInstanceIndex++;
        }
    }
}

