/// <reference path="../AModel.ts" />
module Volary {

    /**
     * Abstract implementation of pixel.
     */
    export abstract class APixel extends AModel implements IPixel {
        
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

