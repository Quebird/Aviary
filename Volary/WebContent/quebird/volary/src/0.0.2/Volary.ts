/// <reference path="AVolary.ts" />
/// <reference path="worlds/Worlds.ts" />
module Volary {
    /**
     * Default implementation of Volary root instance. 
     */
    export class Volary extends AVolary {

        private static volaryInstanceIndex: number = 0;
        /**
         * Constructs Volary with version and empty containers for models and views.
         */
        constructor() {
            super();
            this.initInstance("Volary", Volary.volaryInstanceIndex);
            Volary.volaryInstanceIndex++;
            this.setVersion("0.0.2");
            //this.setModels(new Models(this));
            this.worlds = new Worlds(this);
            this.setViews(new Views(this));
//            this.setCurrentFrame(1);
            this.currentFrame = 1;
            this.setCurrentFrameTime(0);
            this.setCurrentFrameDeltaTime(0);
        }
    }
}

