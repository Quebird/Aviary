module Volary {

    /**
     * View container specification.
     */
    export interface IViews extends IInstance {
        getViewCount() : number;
        getViewByIndex(index : number);

        addView(view : IView);
        removeView(view : IView);
    }

}