/// <reference path="../../instances/AInstance.ts" />
module Volary {

    /**
     * Abstract implementation of point.
     */
    export abstract class APoint extends AInstance implements IPoint {
        
        public pointsOrNull : IPoints;
        
        public x : number;
        public y : number;
        public z : number;
                
        public r : number;        
        public g : number;        
        public b : number;        
        public a : number;        

        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex);
        }
        
        public changeR(r : number)
        {
            this.r = r;      
            if(this.pointsOrNull)
            {
                if(this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame)
                {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        }
        public changeG(g : number)
        {
            this.g = g;      
            if(this.pointsOrNull)
            {
                if(this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame)
                {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        }
        public changeB(b : number)
        {
            this.b = b;      
            if(this.pointsOrNull)
            {
                if(this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame)
                {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        }
        public changeA(a : number)
        {
            this.a = a;      
            if(this.pointsOrNull)
            {
                if(this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame)
                {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        }
        
        public change(x:number, y:number, z:number, r:number, g:number, b:number, a:number) : void
        {
            //var worldOrNull = null;
            if(this.pointsOrNull)// && this.pointsOrNull.world)
            {
                //if(this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame)
                {
                //worldOrNull = this.pointsOrNull.world;
                //this.pointsOrNull.world.removePoint(this);
                    this.pointsOrNull.updatePointColor(this);
                }
            }
            
//            if(x)
            {
                this.x = x;
            }
//            if(y)
            {
                this.y = y;
            }
//            if(z)
            {
                this.z = z;
            }
//            if(r)
            {
                this.r = r;
            }
//            if(g)
            {
                this.g = g;
            }
//            if(b)
            {
                this.b = b;
            }
//            if(a)
            {
                this.a = a;
            }
            
//            if(worldOrNull)
//            {
//                worldOrNull.addPoint(this);
//            }
        }

    }
}

