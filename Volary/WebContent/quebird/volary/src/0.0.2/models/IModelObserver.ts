module Volary {

    /**
     * Model observer specification.
     */
    export interface IModelObserver extends IInstance, ILocationProperty, IExtentProperty 
    {
        startObservingModel(model : IModel) : void;
        isObservingModel(model : IModel) : void;
        stopObservingModel(model : IModel) : void;
    }

}