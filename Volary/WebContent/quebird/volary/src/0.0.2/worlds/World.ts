/// <reference path="AWorld.ts" />
/// <reference path="points/Points.ts" />
module Volary {

    /**
     * Default world implementation.
     */
    export class World extends AWorld {
        private static worldInstanceIndex: number = 0;
        constructor(volary : IVolary, worlds : IWorlds, x : number, y : number, z : number, width : number, height : number, depth : number) 
        {
            super();
            this.initInstance("World", World.worldInstanceIndex);
            this.volary = volary;
            this.worlds = worlds;
            this.x = x;
            this.y = y;
            this.z = z;
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.pointsOutside = new Points(volary, this, -1, -1);
            this.pointsInside = new Array<Array<Points>>();//[height];
            for(var dx : number = 0; dx < width; ++dx)
            {
                this.pointsInside.push(new Array<Points>());
                for(var dy : number = 0; dy < height; ++dy)
                {
                    this.pointsInside[dx].push(new Points(volary, this, dx, dy));
                }
            }
            this.viewsObserving = new Array<IView>();
            World.worldInstanceIndex++;
        }
    }
}

