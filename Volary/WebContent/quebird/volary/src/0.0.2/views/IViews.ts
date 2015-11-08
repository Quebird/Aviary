module Volary {

    /**
     * View container specification.
     */
    export interface IViews extends IInstance {
        
        getVolary() : IVolary;
         
        getViewCount() : number;
        getViewByIndex(index : number) : IView;
        getViewByInstanceId(id : string) : IView;

        addView(view : IView) : void;
        removeView(view : IView) : void;
        
        drawViews() : void;
        
        getDrawViewsCount() : number;
    }

}