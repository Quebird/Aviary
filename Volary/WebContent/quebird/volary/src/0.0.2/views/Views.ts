/// <reference path="AViews.ts" />
module Volary {

    /**
     * Default view container implementation.
     */
    export class Views extends AViews {
        
        private static viewsInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("Views", Views.viewsInstanceIndex);
            Views.viewsInstanceIndex++;
        }
    }
}

