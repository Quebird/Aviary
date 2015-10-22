module Volary {

    /**
     * Height specification.
     */
    export interface IHeight {
        /**
         * Retrieves the height.
         */
        getHeight() : number;
        /**
         * Sets the height.
         */
        setHeight(height: number);
    }

}