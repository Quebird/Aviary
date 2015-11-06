/// <reference path="../IVolary.ts" />
/// <reference path="AModels.ts" />

module Volary {

    /**
     * Default model container implementation.
     */
    export class Models extends AModels {
        
        private static modelsInstanceIndex: number = 0;
        constructor(volary? : IVolary) 
        {
            super();
            this.initInstance("Models", Models.modelsInstanceIndex, volary);
            Models.modelsInstanceIndex++;
        }
    }
}

