module Volary {

    /**
     * Color Channel Green specification.
     */
    export interface IColorChannelGreen {
        /**
         * Retrieves the amount of green in channel [0;255].
         */
        getG() : number;
        /**
         * Sets the amount of green in channel [0;255].
         */
        setG(g : number);
    }

}