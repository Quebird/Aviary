/// <reference path="AModels.ts" />

module Volary {

    /**
     * Default model container implementation.
     */
    export class Models extends AModels {
        
        private static modelsInstanceIndex: number = 0;
        constructor() 
        {
            super();
            this.initInstance("Models", Models.modelsInstanceIndex);
            Models.modelsInstanceIndex++;
        }
    }
}

