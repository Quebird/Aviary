module Volary {

    /**
     * World specification.
     */
    export interface IWorld extends IInstance {
        
        volary : IVolary;
        worlds : IWorlds;
        
        x : number;
        y : number;
        z : number;
        width : number;
        height : number;
        depth : number;

        pointsInside : IPoints[][];
        pointsOutside : IPoints;

        addPoint(point : IPoint) : void;
        removePoint(point : IPoint) : void;
        
        viewsObserving : Array<IView>;
        addObserver(caller : IView) : void;
        hasObserver(caller : IView) : boolean;
        removeObserver(caller : IView) : void;
    }

}