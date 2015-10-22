/// <reference path="AView.ts" />
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
            View.viewInstanceIndex++;
        }
    }
}

