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
        protected setModels(models : Array<IModel>)
        {
            this.models = models;
        }
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
        public getModelCount() : number
        {
            return this.getModels().length;
        }
        public getModelByIndex(index : number)
        {
            var model : IModel = this.getModels()[index];
            return model;
        }

        public addModel(model : IModel)
        {
            this.getModels().push(model);
        }
        public removeModel(model : IModel)
        {
            var models = this.getModels();
            var index = models.indexOf(model);
            models.splice(index, 1);
        }
    }
}

