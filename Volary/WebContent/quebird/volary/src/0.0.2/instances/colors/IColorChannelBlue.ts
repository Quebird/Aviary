module Volary {

    /**
     * Color Channel Blue specification.
     */
    export interface IColorChannelBlue {
        /**
         * Retrieves the amount of blue in channel [0;255].
         */
        getB() : number;
        /**
         * Sets the amount of blue in channel [0;255].
         */
        setB(b : number);
    }

}