module Volary {

    /**
     * Color Channel Red specification.
     */
    export interface IColorChannelRed {
        /**
         * Retrieves the amount of red in channel [0;255].
         */
        getR() : number;
        /**
         * Sets the amount of red in channel [0;255].
         */
        setR(r : number);
    }

}