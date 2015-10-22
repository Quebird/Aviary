module Volary {

    /**
     * Color Channel Alpha specification.
     */
    export interface IColorChannelAlpha {
        /**
         * Retrieves the amount of alpha in channel [0;255].
         */
        getA() : number;
        /**
         * Sets the amount of alpha in channel [0;255].
         */
        setA(a : number);
    }

}