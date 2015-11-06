module Volary {

    /**
     * Abstract points container implementation.
     */
    export abstract class APoints extends AInstance implements IPoints {
        
        public volary : IVolary;
        
        public world : IWorld;
        
        public dx : number;
        public dy : number;
        
        public points: Array<IPoint>;
        
        public frameModfied : number;
        
        public observingViews : Array<IView>;
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number) : void
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
        public addPoint(caller : IWorld, point : IPoint) : void
        {
            var index : number = 0;
            var pointWithGreaterZ : IPoint;
            for(; index < this.points.length; ++index)
            {
                pointWithGreaterZ = this.points[index];
                if(point.z < pointWithGreaterZ.z)
                {
                    break;
                }
            }
            this.points.splice(index, 0, point);
            point.pointsOrNull = this;
            
            if(this.frameModfied < this.volary.currentFrame)
            {
                this.frameModfied = this.volary.currentFrame;
                
                for(index = 0; index < this.observingViews.length; ++index)
                {
                    var view : IView = this.observingViews[index];
                    view.onPointsChanged(this);
                }
            }
        }
        
        public updatePointColor(point : IPoint) : void
        {
            var index : number;
            if(this.frameModfied < this.volary.currentFrame)
            {
                this.frameModfied = this.volary.currentFrame;
                for(index = 0; index < this.observingViews.length; ++index)
                {
                    var view : IView = this.observingViews[index];
                    view.onPointsChanged(this);
                }
            }
        }
        
        public removePoint(caller : IWorld, point : IPoint) : void
        {
            var index : number;
            index = this.points.indexOf(point);

            if(this.frameModfied < this.volary.currentFrame)
            {
                this.frameModfied = this.volary.currentFrame;
                for(index = 0; index < this.observingViews.length; ++index)
                {
                    var view : IView = this.observingViews[index];
                    view.onPointsChanged(this);
                }
            }
            
            this.points.splice(index, 1);
            point.pointsOrNull = null;

        }
        
        public registerView(caller : IView) : void
        {
            this.observingViews.push(caller);
            caller.onPointsAdded(this); // draw this first time
        }
        
        public unregisterView(caller : IView) : void
        {
            var index : number;
            index = this.observingViews.indexOf(caller);
            this.observingViews.splice(index, 1);
            caller.onPointsRemoved(this); // draw this first time
        }

    }
}

