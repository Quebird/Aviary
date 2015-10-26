/// <reference path="../AInstance.ts" />
module Volary {

    /**
     * Abstract implementation of model.
     */
    export abstract class AColor extends AInstance implements IColor {
        
        private r : number;
        /**
         * Retrieves the amount of red in channel [0;255].
         */
        public getR() : number
        {
            return this.r;
        }
        /**
         * Sets the amount of red in channel [0;255].
         */
        public setR(r : number)
        {
            this.r = r;
        }

        private g : number;
        /**
         * Retrieves the amount of green in channel [0;255].
         */
        public getG() : number
        {
            return this.g;
        }
        /**
         * Sets the amount of green in channel [0;255].
         */
        public setG(g : number)
        {
            this.g = g;
        }

        private b : number;
        /**
         * Retrieves the amount of blue in channel [0;255].
         */
        public getB() : number
        {
            return this.b;
        }
        /**
         * Sets the amount of blue in channel [0;255].
         */
        public setB(b : number)
        {
            this.b = b;
        }

        private a : number;
        /**
         * Retrieves the amount of alpha in channel [0;255].
         */
        public getA() : number
        {
            return this.a;
        }
        /**
         * Sets the amount of alpha in channel [0;255].
         */
        public setA(a : number)
        {
            this.a = a;
        }
        
        public getRgbaString() : string
        {
            return "rgba(" + this.getR() + ", " + this.getG() + ", " + this.getB() + ", " + (this.getA()/255.0) + ")";
        }
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            super.initInstance(type, typeInstanceIndex); 
        }

    }
}

