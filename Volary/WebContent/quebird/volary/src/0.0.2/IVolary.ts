module Volary {
    /**
     * Volary specification.
     */
    export interface IVolary extends IInstance {
        /**
         * Retrieves Volary version.
         */
        getVersion(): string;
        /**
         * Retrieves the current models.
         */
        getModels(): IModels;
        /**
         * Retrieves the current views.
         */
        getViews(): IViews;
    }

}