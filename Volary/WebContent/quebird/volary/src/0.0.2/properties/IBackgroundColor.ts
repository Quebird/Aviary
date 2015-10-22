/// <reference path="../instances/colors/IColor.ts" />
module Volary {

    /**
     * Color specification.
     */
    export interface IBackgroundColor
    {
        /**
         * Retrieves the background color.
         */
        getBackgroundColor() : IColor;
        /**
         * Sets the background color.
         */
        setBackgroundColor(backgroundColor : IColor);
    }

}