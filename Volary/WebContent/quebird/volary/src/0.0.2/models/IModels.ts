module Volary {

    /**
     * Model container specification.
     */
    export interface IModels extends IInstance {
        
//        getVolary() : IVolary;
        volary : IVolary;
 
        getModelCount() : number;
        getModelByIndex(index : number) : IModel;

        addModel(model : IModel) : void;
        removeModel(model : IModel) : void;
        
        addModelObserver(modelObserver : IModelObserver) : void;
        notifyModelChangesBegin(caller : IModel) : void;
        notifyModelChangesEnd(caller : IModel) : void;
        removeModelObserver(modelObserver : IModelObserver) : void;
    }

}