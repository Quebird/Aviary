module Volary {

    /**
     * Abstract model container implementation.
     */
    export abstract class AModels extends AInstance implements IModels {
        
        private models: Array<IModel>;
        
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

