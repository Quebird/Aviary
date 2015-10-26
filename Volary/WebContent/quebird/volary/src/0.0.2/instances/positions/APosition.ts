/// <reference path="../AInstance.ts" />
module Volary {

    /**
     * Abstract implementation of Position.
     */
    export abstract class APosition extends AInstance implements IPosition {
        
        private x : number;
        /**
         * Retrieves X.
         */
        public getX() : number
        {
            return this.x;
        }
        /**
         * Sets X.
         */
        public setX(x : number)
        {
            this.x = x;
        }
        
        private y : number;
        /**
         * Retrieves Y.
         */
        public getY() : number
        {
            return this.y;
        }
        /**
         * Sets Y.
         */
        public setY(y : number)
        {
            this.y = y;
        }
        
        private z : number;
        /**
         * Retrieves Z.
         */
        public getZ() : number
        {
            return this.z;
        }
        /**
         * Sets Z.
         */
        public setZ(z : number)
        {
            this.z = z;
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

