/// <reference path="instances/AInstance.ts" />

module Volary {

    /**
     * Abstract implementation of Volary.
     */
    export abstract class AVolary extends AInstance implements IVolary {
        private version: string;
        public getVersion() { return this.version; }
        protected setVersion(version: string) { this.version = version; }
        
        private models: IModels;
        public getModels() { return this.models; }
        protected setModels(models: IModels) { this.models = models; }
        
        private views: IViews;
        public getViews() { return this.views; }
        protected setViews(views: IViews) { this.views = views; }

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

