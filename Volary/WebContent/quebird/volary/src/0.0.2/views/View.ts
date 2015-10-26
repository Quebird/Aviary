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
            this.setCanvas(null);
            this.setLocation(new Position());
            this.setExtent(new Position());
            View.viewInstanceIndex++;
        }
    }
}

