/// <reference path="AWorlds.ts" />
module Volary {

    /**
     * Default worlds implementation.
     */
    export class Worlds extends AWorlds {
        private static worldsInstanceIndex: number = 0;
        constructor(volary : IVolary) 
        {
            super();
            this.initInstance("Worlds", Worlds.worldsInstanceIndex);
            this.volary = volary;
            this.worlds = new Array<IWorld>();
            Worlds.worldsInstanceIndex++;
        }
    }
}

