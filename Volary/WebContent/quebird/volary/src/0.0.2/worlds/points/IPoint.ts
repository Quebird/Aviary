module Volary {

    /**
     * Point specification.
     */
    export interface IPoint extends IInstance {
        
        pointsOrNull : IPoints;
        
        x : number;
        y : number;
        z : number;
        r : number;
        g : number;
        b : number;
        a : number;
        
//        change(x?:number, y?:number, z?:number, r?:number, g?:number, b?:number, a?:number) : void;
        changeR(r:number);
        changeG(r:number);
        changeB(r:number);
        changeA(r:number);
    }

}