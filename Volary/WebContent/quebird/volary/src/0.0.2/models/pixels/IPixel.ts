/// <reference path="../../properties/ILocationProperty.ts" />
/// <reference path="../../properties/IColorProperty.ts" />
module Volary {

    /**
     * Pixel specification.
     */
    export interface IPixel extends IModel, ILocationProperty, IColorProperty {
    }

}