module Volary {

    /**
     * Point container specification.
     */
    export interface IPoints extends IInstance {
        
        volary : IVolary;
        world : IWorld;
        
        dx : number;
        dy : number;
 
        points : Array<IPoint>;
        
        frameModfied : number;
        
        observingViews : Array<IView>;
        
        addPoint(caller : IWorld, point : IPoint) : void;
        updatePointColor(point : IPoint) : void;
        removePoint(caller : IWorld, point : IPoint) : void;
        
        registerView(caller : IView) : void;
        unregisterView(caller : IView) : void;
    }

}