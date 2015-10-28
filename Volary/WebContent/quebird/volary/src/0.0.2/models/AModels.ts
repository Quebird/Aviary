module Volary {

    /**
     * Abstract model container implementation.
     */
    export abstract class AModels extends AInstance implements IModels {
        
        private models: Array<IModel> = new Array<IModel>();
        protected getModels() : Array<IModel>
        {
            return this.models;
        }
        protected setModels(models : Array<IModel>) : void
        {
            this.models = models;
        }
        
        private modelObservers: Array<IModelObserver> = new Array<IModelObserver>();
        protected getModelObservers() : Array<IModelObserver>
        {
            return this.modelObservers;
        }
        protected setModelObservers(modelObservers : Array<IModelObserver>) : void
        {
            this.modelObservers = modelObservers;
        }

        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number) : void
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
        public getModelCount() : number
        {
            return this.getModels().length;
        }
        public getModelByIndex(index : number) : IModel
        {
            var model : IModel = this.getModels()[index];
            return model;
        }

        public addModel(model : IModel) : void
        {
            var modelObservers : Array<IModelObserver> = this.getModelObservers();
            var modelObserver : IModelObserver;
            var modelObserverIndex : number;
            this.getModels().push(model);
            for(modelObserverIndex = 0; modelObserverIndex < modelObservers.length; ++modelObserverIndex)
            {
                modelObserver = modelObservers[modelObserverIndex];
                modelObserver.startObservingModel(model);
            }
        }
        public removeModel(model : IModel) : void
        {
            var modelObservers : Array<IModelObserver> = this.getModelObservers();
            var modelObserver : IModelObserver;
            var modelObserverIndex : number;
            var models = this.getModels();
            var index = models.indexOf(model);
            for(modelObserverIndex = 0; modelObserverIndex < modelObservers.length; ++modelObserverIndex)
            {
                modelObserver = modelObservers[modelObserverIndex];
                modelObserver.stopObservingModel(model);
            }
            models.splice(index, 1);
        }

        public addModelObserver(modelObserver : IModelObserver) : void
        {
            var models : Array<IModel> = this.getModels();
            var model : IModel;
            var modelIndex : number;
            for(modelIndex = 0; modelIndex < models.length; ++modelIndex)
            {
                model = models[modelIndex];
                modelObserver.startObservingModel(model);
            }
            this.getModelObservers().push(modelObserver);
        }
        public removeModelObserver(modelObserver : IModelObserver) : void
        {
            var modelObservers = this.getModelObservers();
            var index = modelObservers.indexOf(modelObserver);
            var models : Array<IModel> = this.getModels();
            var model : IModel;
            var modelIndex : number;
            for(modelIndex = 0; modelIndex < models.length; ++modelIndex)
            {
                model = models[modelIndex];
                modelObserver.stopObservingModel(model);
            }
            modelObservers.splice(index, 1);
        }
    }
}

