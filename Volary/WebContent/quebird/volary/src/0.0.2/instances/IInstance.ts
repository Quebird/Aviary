module Volary {

    /**
     * Generic object specification.
     */
    export interface IInstance {
        /**
         * Retrieves the creation index of this instance.
         */
        getInstanceIndex() : number;
        /**
         * Retrieves the type of this.
         */
        getType() : string;
        /**
         * Retrieves the creation index of this type.
         */
        getTypeInstanceIndex() : number;
        
        /**
         * Retrieves the id of this.
         */
        getId() : string;
        /**
         * Sets the id of this.
         */
        setId(id: string) : void;
    }

}