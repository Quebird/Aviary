module Volary {

    /**
     * Model container specification.
     */
    export interface IModels extends IInstance {
        getModelCount() : number;
        getModelByIndex(index : number);

        addModel(model : IModel);
        removeModel(model : IModel);
    }

}