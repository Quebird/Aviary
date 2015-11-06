module Volary {
    /**
     * Volary specification.
     */
    export interface IVolary extends IInstance {
        /**
         * Retrieves Volary version.
         */
        getVersion(): string;
        
        worlds : IWorlds;
        
        /**
         * Retrieves the current models.
         */
        //getModels(): IModels;
        /**
         * Retrieves the current views.
         */
        getViews(): IViews;
        
        currentFrame : number;
//        /**
//         * Retrieves the frame currently targeted - not yet rendered.
//         */
//        getCurrentFrame() : number;
        /**
         * Retrieves the time between the frame currently targeted and the previous frame. 
         */
        getCurrentFrameDeltaTime() : number;
        /**
         * Retrieves the time of the frame currently targeted.
         */
        getCurrentFrameTime() : number;

        /**
         * Method to call before modifying models and rendering views.
         * 
         * Usually the first volary method call in window.requestAnimationFrame
         */
        beginFrame(timeMS : number) : void;
        
       /**
         * Method to call after modifying models and rendering views.
         * 
         * Usually the last volary method call in window.requestAnimationFrame
         */
        endFrame() : void;
        
    }

}