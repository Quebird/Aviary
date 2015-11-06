/// <reference path="../instances/AInstance.ts" />
module Volary {

    /**
     * Abstract implementation of world.
     */
    export abstract class AWorld extends AInstance implements IWorld {
        
        public volary : IVolary;
        public worlds : IWorlds;
        
        public x : number;
        public y : number;
        public z : number;
                
        public width : number;
        public height : number;
        public depth : number;
        
        public pointsOutside : IPoints;
        public pointsInside : IPoints[][];

        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex);
        }

        public addPoint(point : IPoint) : void
        {
            if(
                (this.x <= point.x && point.x < this.x + this.width)
                && (this.y <= point.y && point.y < this.y + this.height)
                && (this.z <= point.z && point.z < this.z + this.depth))
            {
                this.pointsInside[point.x-this.x][point.y-this.y].addPoint(this, point);
            }
            else
            {
                this.pointsOutside.addPoint(this, point);
            }
        }
        public removePoint(point : IPoint) : void
        {
           if(
                (this.x <= point.x && point.x < this.x + this.width)
                && (this.y <= point.y && point.y < this.y + this.height)
                && (this.z <= point.z && point.z < this.z + this.depth))
            {
                this.pointsInside[point.x-this.x][point.y-this.y].removePoint(this, point);
            }
            else
            {
                this.pointsOutside.removePoint(this, point);
            }
        }
        
        public viewsObserving : Array<IView>;
        
        public addObserver(caller : IView) : void
        {
            for(var dy : number = 0; dy < this.height; ++dy)
            {
                for(var dx : number = 0; dx < this.width; ++dx)
                {
                    var pointsInside = this.pointsInside[dx][dy];
                    var x = this.x + dx;
                    var y = this.y + dy;
                    if((caller.x <= x && x < caller.x + caller.width)
                        && (caller.y <= y && y < caller.y + caller.height))
                    {
                        pointsInside.registerView(caller);
                    }
                }
            }
            this.viewsObserving.push(caller);
        }
        
        public hasObserver(caller : IView) : boolean
        {
            return (0 <= this.viewsObserving.indexOf(caller));
        }
        
        public removeObserver(caller : IView) : void
        {
           var index = this.viewsObserving.indexOf(caller);
           for(var dy : number = 0; dy < this.height; ++dy)
            {
                for(var dx : number = 0; dx < this.width; ++dx)
                {
                    var pointsInside = this.pointsInside[dx][dy];
                    var x = this.x + dx;
                    var y = this.y + dy;
                    if((caller.x <= x && x < caller.x + caller.width)
                        && (caller.y <= y && y < caller.y + caller.height))
                    {
                        pointsInside.unregisterView(caller);
                    }
                }
            }
            this.viewsObserving.splice(index, 1);
        }

    }
}

