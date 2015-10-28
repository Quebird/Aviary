module Volary {

    /**
     * Model container specification.
     */
    export interface IModels extends IInstance {
        getModelCount() : number;
        getModelByIndex(index : number) : IModel;

        addModel(model : IModel) : void;
        removeModel(model : IModel) : void;
        
        addModelObserver(modelObserver : IModelObserver) : void;
        removeModelObserver(modelObserver : IModelObserver) : void;
    }

}