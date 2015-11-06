/// <reference path="../instances/AInstance.ts" />
module Volary {

    /**
     * Abstract implementation of model.
     */
    export abstract class AModel extends AInstance implements IModel {
        
        public frameModified : number;
//        /**
//        * Retrieves the volary frame this model was last modified.
//        */
//        public getFrameModified() : number
//        {
//            return this.frameModified;
//        }
//        protected setFrameModified(frameModified : number) : void
//        {
//            this.frameModified = frameModified;
//        }

        public modelsOrNull : IModels;
//        /**
//         * Retrieves parent collection, if this has been added one.
//         */
//        public getModelsOrNull() : IModels
//        {
//            return this.modelsOrNull;
//        }
//        /**
//         * Sets the parent collection, if added, or clears it, if removed.
//         */
//        public setModelsOrNull(caller : IModels) : void
//        {
//            this.modelsOrNull = caller;
//        }
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex); 
        }

        
        /**
         * Call this before changing the model.
         */
        public beginChanges() : number
        {
            var changesId : number = 0;
            //var modelsOrNull : IModels;
            
//            modelsOrNull = this.getModelsOrNull();
            if(this.modelsOrNull)
            {
                var volary : IVolary;
                var frameModifiedVolary : number;
//                volary = this.modelsOrNull.getVolary();
                volary = this.modelsOrNull.volary;
//                frameModifiedVolary = volary.getCurrentFrame();
                frameModifiedVolary = volary.currentFrame;
                //this.setFrameModified(frameModifiedVolary);
                this.frameModified = frameModifiedVolary;
                this.modelsOrNull.notifyModelChangesBegin(this);
                changesId = frameModifiedVolary;
            }
            
            return changesId;
        }
        
        /**
         * Call this to to end changes.
         */
        endChanges(changesId : number) : void
        {
            //var modelsOrNull : IModels;
            
            //modelsOrNull = this.getModelsOrNull();
            if(this.modelsOrNull)
            {
                this.modelsOrNull.notifyModelChangesEnd(this);
            }
        }

    }
}

