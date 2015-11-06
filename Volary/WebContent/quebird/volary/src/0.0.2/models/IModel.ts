module Volary {

    /**
     * Model specification.
     */
    export interface IModel extends IInstance {
        
        /**
         * Retrieves parent collection, if this has been added one.
         */
        //getModelsOrNull() : IModels;
        /**
         * Sets the parent collection, if added, or clears it, if removed.
         */
        //setModelsOrNull(caller : IModels) : void;
        modelsOrNull : IModels;
        
        /**
         * Retrieves the volary frame this model was last modified.
         */
//        getFrameModified() : number;
        frameModified : number;
        
        /**
         * Call this before changing the model.
         */
        beginChanges() : number;
        
        /**
         * Call this to to end changes.
         */
        endChanges(changesId : number) : void;
    }

}