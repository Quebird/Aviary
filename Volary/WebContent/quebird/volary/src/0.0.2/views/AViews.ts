/// <reference path="../IVolary.ts" />
/// <reference path="../instances/AInstance.ts" />
/// <reference path="../models/IModels.ts" />
module Volary {

    /**
     * Abstract view container implementation.
     */
    export abstract class AViews extends AInstance implements IViews {
        
        private volary : IVolary;
        public getVolary() : IVolary
        {
            return this.volary;
        }
        protected setVolary(volary : IVolary) : void
        {
            this.volary = volary;
        }
         
        private views: Array<IView> = new Array<IView>();
        protected getViews() : Array<IView>
        {
            return this.views;
        }
        protected setViews(views : Array<IView>) : void
        {
            this.views = views;
        }
        
        private drawViewsCount : number = 0;
        public getDrawViewsCount() : number
        {
            return this.drawViewsCount;
        }
        protected setDrawViewsCount(drawViewsCount : number) : void
        {
            this.drawViewsCount = drawViewsCount;
        }
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number, volary? : IVolary) : void
        {
            super.initInstance(type, typeInstanceIndex);
            if(volary)
            {
                this.setVolary(volary);
            }
        }
        
        public getViewCount() : number
        {
            return this.getViews().length;
        }
        public getViewByIndex(index : number) : IView
        {
            var view : IView = this.getViews()[index];
            return view;
        }

        public addView(view : IView) : void
        {
            var volary : IVolary = this.getVolary();
            this.getViews().push(view);
            view.volaryOrNull = volary;
            view.viewsOrNull = this;
            //volary.getModels().addModelObserver(view);
            //volary.worlds.
        }
        public removeView(view : IView) : void
        {
            var volary : IVolary = this.getVolary();
            var views : Array<IView> = this.getViews();
            var index = views.indexOf(view);
            //volary.getModels().removeModelObserver(view);
            views.splice(index, 1);
            view.viewsOrNull = null;
            view.volaryOrNull = null;
        }
        
        public drawViews() : void
        {
            var views : Array<IView> = this.getViews();
            var index = 0;
            var view : IView;
            var drawViewsCount : number = this.drawViewsCount;// this.getDrawViewsCount();
            for(index = 0; index < views.length; ++index)
            {
                view = views[index];
                view.draw();
            }
            {
                ++drawViewsCount;
                this.drawViewsCount = drawViewsCount;//this.setDrawViewsCount(drawViewsCount);
            }
        }

    }
}

