module Volary {

    /**
     * Generic object specification.
     */
    export interface IInstance {
        /**
         * Retrieves the creation index of this instance.
         */
        getInstanceIndex();
        /**
         * Retrieves the type of this.
         */
        getType();
        /**
         * Retrieves the creation index of this type.
         */
        getTypeInstanceIndex();
        
        /**
         * Retrieves the id of this.
         */
        getId(): string;
        /**
         * Sets the id of this.
         */
        setId(id: string);
    }

}