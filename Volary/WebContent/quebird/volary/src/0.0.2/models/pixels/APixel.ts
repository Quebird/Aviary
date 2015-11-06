/// <reference path="../AModel.ts" />
/// <reference path="../../instances/positions/IPosition.ts" />
/// <reference path="../../instances/colors/IColor.ts" />
module Volary {

    /**
     * Abstract implementation of pixel.
     */
    export abstract class APixel extends AModel implements IPixel {
        
/*        private location : IPosition;
        public getLocation() : IPosition
        {
            return this.location;
        }
        protected setLocation(location : IPosition)
        {
            this.location = location;
        }
*/
        public x : number;
        public y : number;
        public z : number;
                
/*        private color : IColor;
        public getColor() : IColor
        {
            return this.color;
        }
        protected setColor(color : IColor)
        {
            this.color = color;
        }
*/
        public r : number;        
        public g : number;        
        public b : number;        
        public a : number;        

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

