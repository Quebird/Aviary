/// <reference path="instances/AInstance.ts" />

module Volary {

    /**
     * Abstract implementation of Volary.
     */
    export abstract class AVolary extends AInstance implements IVolary {
        
        private version: string;
        public getVersion() : string
        { 
            return this.version; 
        }
        protected setVersion(version: string) : void
        { 
            this.version = version; 
        }
        
/*        private models: IModels;
        public getModels() : IModels
        { 
            return this.models; 
        }
        protected setModels(models: IModels) : void 
        { 
            this.models = models; 
        }
*/        
        public worlds : IWorlds;

        
        private views: IViews;
        public getViews() : IViews
        { 
            return this.views; 
        }
        protected setViews(views: IViews) : void 
        { 
            this.views = views; 
        }
        
        public currentFrame : number;
//        /**
//        * Retrieves the frame currently targeted - not yet rendered.
//        */
//        public getCurrentFrame() : number
//        {
//            return this.currentFrame;
//        }
//        protected setCurrentFrame(currentFrame : number) : void
//        {
//            this.currentFrame = currentFrame;
//        }
        
        private currentFrameTime : number;
        /**
         * Retrieves the time of the frame currently targeted.
         */
        public getCurrentFrameTime() : number
        {
            return this.currentFrameTime;
        }
        protected setCurrentFrameTime(currentFrameTime : number) : void
        {
            this.currentFrameTime = currentFrameTime;
        }

        private currentFrameDeltaTime : number;
        /**
         * Retrieves the time between the frame currently targeted and the previous frame. 
         */
        public getCurrentFrameDeltaTime() : number
        {
            return this.currentFrameDeltaTime;
        }
        protected setCurrentFrameDeltaTime(currentFrameDeltaTime : number) : void
        {
            this.currentFrameDeltaTime = currentFrameDeltaTime;
        }

        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number) : void
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
                
        /**
         * Method to call before modifying models and rendering views.
         * 
         * Usually the first volary method call in window.requestAnimationFrame
         */
        public beginFrame(timeMS : number) : void
        {
            var previousFrameTime : number = this.getCurrentFrameTime();
            var deltaFrameTime : number = timeMS - previousFrameTime;
            
            this.setCurrentFrameTime(timeMS);
            this.setCurrentFrameDeltaTime(deltaFrameTime);
        }
        
       /**
         * Method to call after modifying models and rendering views.
         * 
         * Usually the last volary method call in window.requestAnimationFrame
         */
        public endFrame() : void
        {
            //var currentFrame : number = this.getCurrentFrame();
            
            //this.setCurrentFrame(currentFrame + 1); // all model changes will be marked with this
            this.currentFrame += 1;
            this.setCurrentFrameDeltaTime(0); // we don't know this yet
        }
    }
}

