/// <reference path="../instances/AInstance.ts" />
module Volary {

    /**
     * Abstract implementation of model.
     */
    export abstract class AModel extends AInstance implements IModel {
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex); 
        }

    }
}

