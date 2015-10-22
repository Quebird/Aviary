/// <reference path="../instances/AInstance.ts" />
module Volary {

    /**
     * Abstract view container implementation.
     */
    export abstract class AViews extends AInstance implements IViews {
        
        private views: Array<IView> = new Array<IView>();
        protected getViews() : Array<IView>
        {
            return this.views;
        }
        protected setViews(views : Array<IView>)
        {
            this.views = views;
        }
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
        public getViewCount() : number
        {
            return this.getViews().length;
        }
        public getViewByIndex(index : number)
        {
            var view : IView = this.getViews()[index];
            return view;
        }

        public addView(view : IView)
        {
            this.getViews().push(view);
        }
        public removeView(view : IView)
        {
            var views = this.getViews();
            var index = views.indexOf(view);
            views.splice(index, 1);
        }

    }
}

