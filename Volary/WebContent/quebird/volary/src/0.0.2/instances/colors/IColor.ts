/// <reference path="../IInstance.ts" />
module Volary {

    /**
     * Color specification.
     */
    export interface IColor extends IInstance, IColorChannelRed, IColorChannelGreen, IColorChannelBlue, IColorChannelAlpha
    {
        getRgbaString() : string;
    }

}