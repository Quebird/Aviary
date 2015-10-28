/// <reference path="../IVolary.ts" />
/// <reference path="AViews.ts" />
module Volary {

    /**
     * Default view container implementation.
     */
    export class Views extends AViews {
        
        private static viewsInstanceIndex: number = 0;
        constructor(volary? : IVolary) 
        {
            super();
            this.initInstance("Views", Views.viewsInstanceIndex, volary);
            Views.viewsInstanceIndex++;
        }
    }
}

