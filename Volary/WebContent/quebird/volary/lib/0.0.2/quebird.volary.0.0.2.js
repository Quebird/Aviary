/// <reference path="../IInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of generic base object.
     */
    var AInstance = (function () {
        function AInstance() {
        }
        AInstance.getInstancesCreated = function () {
            return AInstance.instancesCreated;
        };
        AInstance.setInstancesCreated = function (instancesCreated) {
            AInstance.instancesCreated = instancesCreated;
        };
        AInstance.incrementInstancesCreated = function () {
            AInstance.setInstancesCreated(AInstance.getInstancesCreated() + 1);
        };
        AInstance.prototype.getInstanceIndex = function () {
            return this.instanceIndex;
        };
        AInstance.prototype.setInstanceIndex = function (instanceIndex) {
            this.instanceIndex = instanceIndex;
        };
        AInstance.prototype.getTypeInstanceIndex = function () {
            return this.typeInstanceIndex;
        };
        AInstance.prototype.setTypeInstanceIndex = function (typeInstanceIndex) {
            this.typeInstanceIndex = typeInstanceIndex;
        };
        AInstance.prototype.getType = function () {
            return this.type;
        };
        AInstance.prototype.setType = function (type) {
            this.type = type;
        };
        AInstance.prototype.getId = function () {
            return this.id;
        };
        AInstance.prototype.setId = function (id) {
            this.id = id;
        };
        AInstance.prototype.initInstance = function (type, typeInstanceIndex) {
            this.setType(type);
            this.setInstanceIndex(AInstance.getInstancesCreated());
            AInstance.incrementInstancesCreated();
            this.setTypeInstanceIndex(typeInstanceIndex);
            this.setId(this.getType() + this.getTypeInstanceIndex());
        };
        AInstance.instancesCreated = 0;
        return AInstance;
    })();
    Volary.AInstance = AInstance;
})(Volary || (Volary = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../instances/AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of model.
     */
    var AModel = (function (_super) {
        __extends(AModel, _super);
        //        /**
        //         * Retrieves parent collection, if this has been added one.
        //         */
        //        public getModelsOrNull() : IModels
        //        {
        //            return this.modelsOrNull;
        //        }
        //        /**
        //         * Sets the parent collection, if added, or clears it, if removed.
        //         */
        //        public setModelsOrNull(caller : IModels) : void
        //        {
        //            this.modelsOrNull = caller;
        //        }
        function AModel() {
            _super.call(this);
        }
        AModel.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        /**
         * Call this before changing the model.
         */
        AModel.prototype.beginChanges = function () {
            var changesId = 0;
            //var modelsOrNull : IModels;
            //            modelsOrNull = this.getModelsOrNull();
            if (this.modelsOrNull) {
                var volary;
                var frameModifiedVolary;
                //                volary = this.modelsOrNull.getVolary();
                volary = this.modelsOrNull.volary;
                //                frameModifiedVolary = volary.getCurrentFrame();
                frameModifiedVolary = volary.currentFrame;
                //this.setFrameModified(frameModifiedVolary);
                this.frameModified = frameModifiedVolary;
                this.modelsOrNull.notifyModelChangesBegin(this);
                changesId = frameModifiedVolary;
            }
            return changesId;
        };
        /**
         * Call this to to end changes.
         */
        AModel.prototype.endChanges = function (changesId) {
            //var modelsOrNull : IModels;
            //modelsOrNull = this.getModelsOrNull();
            if (this.modelsOrNull) {
                this.modelsOrNull.notifyModelChangesEnd(this);
            }
        };
        return AModel;
    })(Volary.AInstance);
    Volary.AModel = AModel;
})(Volary || (Volary = {}));
/// <reference path="../IInstance.ts" />
/// <reference path="../AModel.ts" />
/// <reference path="../../instances/positions/IPosition.ts" />
/// <reference path="../../instances/colors/IColor.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of pixel.
     */
    var APixel = (function (_super) {
        __extends(APixel, _super);
        function APixel() {
            _super.call(this);
        }
        APixel.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        return APixel;
    })(Volary.AModel);
    Volary.APixel = APixel;
})(Volary || (Volary = {}));
/// <reference path="../AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of Position.
     */
    var APosition = (function (_super) {
        __extends(APosition, _super);
        function APosition() {
            _super.call(this);
        }
        /**
         * Retrieves X.
         */
        APosition.prototype.getX = function () {
            return this.x;
        };
        /**
         * Sets X.
         */
        APosition.prototype.setX = function (x) {
            this.x = x;
        };
        /**
         * Retrieves Y.
         */
        APosition.prototype.getY = function () {
            return this.y;
        };
        /**
         * Sets Y.
         */
        APosition.prototype.setY = function (y) {
            this.y = y;
        };
        /**
         * Retrieves Z.
         */
        APosition.prototype.getZ = function () {
            return this.z;
        };
        /**
         * Sets Z.
         */
        APosition.prototype.setZ = function (z) {
            this.z = z;
        };
        APosition.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        return APosition;
    })(Volary.AInstance);
    Volary.APosition = APosition;
})(Volary || (Volary = {}));
var Volary;
(function (Volary) {
    /**
     * Abstract points container implementation.
     */
    var APoints = (function (_super) {
        __extends(APoints, _super);
        function APoints() {
            _super.call(this);
        }
        APoints.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        APoints.prototype.addPoint = function (caller, point) {
            var index = 0;
            var pointWithGreaterZ;
            for (; index < this.points.length; ++index) {
                pointWithGreaterZ = this.points[index];
                if (point.z < pointWithGreaterZ.z) {
                    break;
                }
            }
            this.points.splice(index, 0, point);
            point.pointsOrNull = this;
            if (this.frameModfied < this.volary.currentFrame) {
                this.frameModfied = this.volary.currentFrame;
                for (index = 0; index < this.observingViews.length; ++index) {
                    var view = this.observingViews[index];
                    view.onPointsChanged(this);
                }
            }
        };
        APoints.prototype.updatePointColor = function (point) {
            var index;
            if (this.frameModfied < this.volary.currentFrame) {
                this.frameModfied = this.volary.currentFrame;
                for (index = 0; index < this.observingViews.length; ++index) {
                    var view = this.observingViews[index];
                    view.onPointsChanged(this);
                }
            }
        };
        APoints.prototype.removePoint = function (caller, point) {
            var index;
            index = this.points.indexOf(point);
            if (this.frameModfied < this.volary.currentFrame) {
                this.frameModfied = this.volary.currentFrame;
                for (index = 0; index < this.observingViews.length; ++index) {
                    var view = this.observingViews[index];
                    view.onPointsChanged(this);
                }
            }
            this.points.splice(index, 1);
            point.pointsOrNull = null;
        };
        APoints.prototype.registerView = function (caller) {
            this.observingViews.push(caller);
            caller.onPointsAdded(this); // draw this first time
        };
        APoints.prototype.unregisterView = function (caller) {
            var index;
            index = this.observingViews.indexOf(caller);
            this.observingViews.splice(index, 1);
            caller.onPointsRemoved(this); // draw this first time
        };
        return APoints;
    })(Volary.AInstance);
    Volary.APoints = APoints;
})(Volary || (Volary = {}));
/// <reference path="APoints.ts" />
var Volary;
(function (Volary) {
    /**
     * Default points implementation.
     */
    var Points = (function (_super) {
        __extends(Points, _super);
        function Points(volary, world, dx, dy) {
            _super.call(this);
            this.initInstance("Points", Points.pointsInstanceIndex);
            this.volary = volary;
            this.world = world;
            this.dx = dx;
            this.dy = dy;
            this.frameModfied = 0;
            this.points = new Array();
            this.observingViews = new Array();
            Points.pointsInstanceIndex++;
        }
        Points.pointsInstanceIndex = 0;
        return Points;
    })(Volary.APoints);
    Volary.Points = Points;
})(Volary || (Volary = {}));
/// <reference path="../AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of model.
     */
    var AColor = (function (_super) {
        __extends(AColor, _super);
        function AColor() {
            _super.call(this);
        }
        /**
         * Retrieves the amount of red in channel [0;255].
         */
        AColor.prototype.getR = function () {
            return this.r;
        };
        /**
         * Sets the amount of red in channel [0;255].
         */
        AColor.prototype.setR = function (r) {
            this.r = r;
        };
        /**
         * Retrieves the amount of green in channel [0;255].
         */
        AColor.prototype.getG = function () {
            return this.g;
        };
        /**
         * Sets the amount of green in channel [0;255].
         */
        AColor.prototype.setG = function (g) {
            this.g = g;
        };
        /**
         * Retrieves the amount of blue in channel [0;255].
         */
        AColor.prototype.getB = function () {
            return this.b;
        };
        /**
         * Sets the amount of blue in channel [0;255].
         */
        AColor.prototype.setB = function (b) {
            this.b = b;
        };
        /**
         * Retrieves the amount of alpha in channel [0;255].
         */
        AColor.prototype.getA = function () {
            return this.a;
        };
        /**
         * Sets the amount of alpha in channel [0;255].
         */
        AColor.prototype.setA = function (a) {
            this.a = a;
        };
        AColor.prototype.getRgbaString = function () {
            return "rgba(" + this.getR() + ", " + this.getG() + ", " + this.getB() + ", " + (this.getA() / 255.0) + ")";
        };
        AColor.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        return AColor;
    })(Volary.AInstance);
    Volary.AColor = AColor;
})(Volary || (Volary = {}));
/// <reference path="AColor.ts" />
var Volary;
(function (Volary) {
    /**
     * Default color implementation.
     */
    var Color = (function (_super) {
        __extends(Color, _super);
        function Color() {
            _super.call(this);
            this.initInstance("Color", Color.modelInstanceIndex);
            this.setR(0);
            this.setG(0);
            this.setB(0);
            this.setA(0);
            Color.modelInstanceIndex++;
        }
        Color.modelInstanceIndex = 0;
        return Color;
    })(Volary.AColor);
    Volary.Color = Color;
})(Volary || (Volary = {}));
/// <reference path="../../instances/AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract canvas implementation.
     */
    var ACanvas = (function (_super) {
        __extends(ACanvas, _super);
        function ACanvas() {
            _super.call(this);
        }
        ACanvas.prototype.getElement = function () {
            return this.element;
        };
        ACanvas.prototype.setElement = function (element) {
            this.element = element;
        };
        ACanvas.prototype.getContext = function () {
            return this.context;
        };
        ACanvas.prototype.setContext = function (context) {
            this.context = context;
        };
        ACanvas.prototype.getImageData = function () {
            return this.imageData;
        };
        ACanvas.prototype.setImageData = function (imageData) {
            this.imageData = imageData;
        };
        ACanvas.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        ACanvas.prototype.createInDocument = function (caller) {
            var element;
            var context;
            var imageData;
            var imageDataIndex;
            {
                element = document.createElement('canvas');
                element.id = this.getId();
                //                element.width = caller.getExtent().getX();
                //                element.height = caller.getExtent().getY();
                element.width = caller.width;
                element.height = caller.height;
                document.getElementsByTagName('body')[0].appendChild(element);
                this.setElement(element);
            }
            {
                context = element.getContext("2d");
                this.setContext(context);
            }
            {
                //                imageData = context.createImageData(caller.getExtent().getX(), caller.getExtent().getY());
                imageData = context.createImageData(caller.width, caller.height);
                this.setImageData(imageData);
                this.resetImageData(caller.r, caller.g, caller.b, caller.a);
            }
            //            context.fillStyle = caller.getBackgroundColor().getRgbaString();
            //            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
        };
        ACanvas.prototype.attachToDocument = function (caller, elementId) {
            var element;
            var context;
            var imageData;
            var imageDataIndex;
            {
                element = document.getElementById(elementId);
                this.setId(elementId);
                this.setElement(element);
            }
            //            caller.setHeight(element.height);
            //            caller.setWidth(element.width);
            {
                context = element.getContext("2d");
                this.setContext(context);
            }
            {
                //imageData = context.createImageData(caller.getExtent().getX(), caller.getExtent().getY());
                imageData = context.createImageData(caller.width, caller.height);
                this.setImageData(imageData);
                this.resetImageData(caller.r, caller.g, caller.b, caller.a);
            }
            //            context.fillStyle = caller.getBackgroundColor().getRgbaString();
            //            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
        };
        ACanvas.prototype.detachFromDocument = function (caller) {
            this.setContext(null);
            this.setElement(null);
        };
        ACanvas.prototype.deleteFromDocument = function (caller) {
            var element = this.getElement();
            element.parentNode.removeChild(element);
            this.setContext(null);
            this.setElement(null);
        };
        ACanvas.prototype.resize = function (width, height) {
            var element;
            var imageData;
            var context;
            element = document.getElementById(this.getId());
            element.width = width;
            element.height = height;
            context = this.getContext();
            imageData = context.createImageData(width, height);
            this.setImageData(imageData);
        };
        ACanvas.prototype.resetImageData = function (r, g, b, a) {
            var imageData = this.getImageData();
            for (var imageDataIndex = 0; imageDataIndex < imageData.data.length; imageDataIndex += 4) {
                imageData.data[imageDataIndex + 0] = r;
                imageData.data[imageDataIndex + 1] = g;
                imageData.data[imageDataIndex + 2] = b;
                imageData.data[imageDataIndex + 3] = a;
            }
        };
        ACanvas.prototype.drawStart = function (caller) {
            return this.getImageData();
        };
        ACanvas.prototype.drawEnd = function (caller, imageData) {
            var context = this.getContext();
            this.setImageData(imageData);
            context.putImageData(imageData, 0, 0);
        };
        return ACanvas;
    })(Volary.AInstance);
    Volary.ACanvas = ACanvas;
})(Volary || (Volary = {}));
/// <reference path="ACanvas.ts" />
var Volary;
(function (Volary) {
    /**
     * Default canvas implementation.
     */
    var Canvas = (function (_super) {
        __extends(Canvas, _super);
        function Canvas() {
            _super.call(this);
            this.initInstance("Canvas", Canvas.canvasInstanceIndex);
            Canvas.canvasInstanceIndex++;
        }
        Canvas.canvasInstanceIndex = 0;
        return Canvas;
    })(Volary.ACanvas);
    Volary.Canvas = Canvas;
})(Volary || (Volary = {}));
/// <reference path="../instances/AInstance.ts" />
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/colors/Color.ts" />
/// <reference path="canvases/Canvas.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract view implementation.
     */
    var AView = (function (_super) {
        __extends(AView, _super);
        function AView() {
            _super.call(this);
            this.canvasOrNull = null;
            this.drawCount = 0;
            this.observedModels = new Array();
            this.observedModels2Hide = new Array();
            this.observedModels2Show = new Array();
        }
        AView.prototype.getCanvasOrNull = function () {
            return this.canvasOrNull;
        };
        AView.prototype.setCanvasOrNull = function (canvasOrNull) {
            this.canvasOrNull = canvasOrNull;
        };
        AView.prototype.changeXyz = function (color) {
            if (null != this.volaryOrNull) {
                var worldsObserved = new Array();
                for (var index = 0; index < this.volaryOrNull.worlds.worlds.length; ++index) {
                    var world = this.volaryOrNull.worlds.worlds[index];
                    if (world.hasObserver(this)) {
                        worldsObserved.push(world);
                        world.removeObserver(this);
                    }
                }
                if (color.x) {
                    this.x = color.x;
                }
                if (color.y) {
                    this.y = color.y;
                }
                if (color.z) {
                    this.z = color.z;
                }
                if (null != this.canvasOrNull) {
                    this.canvasOrNull.resetImageData(this.r, this.g, this.b, this.a);
                }
                for (var index = 0; index < worldsObserved.length; ++index) {
                    var world = worldsObserved[index];
                    world.addObserver(this);
                }
            }
        };
        AView.prototype.changeRgba = function (color) {
            if (color.r) {
                this.r = color.r;
            }
            if (color.g) {
                this.g = color.g;
            }
            if (color.b) {
                this.b = color.b;
            }
            if (color.a) {
                this.a = color.a;
            }
            if (null != this.volaryOrNull) {
                var worldsObserved = new Array();
                for (var index = 0; index < this.volaryOrNull.worlds.worlds.length; ++index) {
                    var world = this.volaryOrNull.worlds.worlds[index];
                    if (world.hasObserver(this)) {
                        worldsObserved.push(world);
                        world.removeObserver(this);
                    }
                }
                if (null != this.canvasOrNull) {
                    this.canvasOrNull.resetImageData(this.r, this.g, this.b, this.a);
                }
                for (var index = 0; index < worldsObserved.length; ++index) {
                    var world = worldsObserved[index];
                    world.addObserver(this);
                }
            }
        };
        AView.prototype.changeWidthHeightDepth = function (color) {
            if (null != this.volaryOrNull) {
                var worldsObserved = new Array();
                for (var index = 0; index < this.volaryOrNull.worlds.worlds.length; ++index) {
                    var world = this.volaryOrNull.worlds.worlds[index];
                    if (world.hasObserver(this)) {
                        worldsObserved.push(world);
                        world.removeObserver(this);
                    }
                }
                if (color.width) {
                    this.width = color.width;
                }
                if (color.height) {
                    this.height = color.height;
                }
                if (color.depth) {
                    this.depth = color.depth;
                }
                if (null != this.canvasOrNull) {
                    this.canvasOrNull.resize(this.width, this.height);
                    this.canvasOrNull.resetImageData(this.r, this.g, this.b, this.a);
                }
                for (var index = 0; index < worldsObserved.length; ++index) {
                    var world = worldsObserved[index];
                    world.addObserver(this);
                }
            }
        };
        AView.prototype.getDrawCount = function () {
            return this.drawCount;
        };
        AView.prototype.setDrawCount = function (drawCount) {
            this.drawCount = drawCount;
        };
        AView.prototype.getObservedModels = function () {
            return this.observedModels;
        };
        AView.prototype.setObservedModels = function (observedModels) {
            this.observedModels = observedModels;
        };
        AView.prototype.getObservedModels2Hide = function () {
            return this.observedModels2Hide;
        };
        AView.prototype.setObservedModels2Hided = function (observedModels2Hide) {
            this.observedModels2Hide = observedModels2Hide;
        };
        AView.prototype.getObservedModels2Show = function () {
            return this.observedModels2Show;
        };
        AView.prototype.setObservedModels2Showd = function (observedModels2Show) {
            this.observedModels2Show = observedModels2Show;
        };
        AView.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        AView.prototype.constructCanvas = function () {
            var canvas = new Volary.Canvas();
            canvas.createInDocument(this);
            this.setCanvasOrNull(canvas);
        };
        AView.prototype.attachCanvas = function (elementId) {
            var canvas = new Volary.Canvas();
            var element;
            element = document.getElementById(elementId);
            /*            this.getExtent().setX(element.width);
                        this.getExtent().setY(element.height);
            */
            this.width = element.width;
            this.height = element.height;
            canvas.attachToDocument(this, elementId);
            this.setCanvasOrNull(canvas);
        };
        AView.prototype.detachCanvas = function () {
            this.getCanvasOrNull().detachFromDocument(this);
            this.setCanvasOrNull(null);
        };
        AView.prototype.destructCanvas = function () {
            this.getCanvasOrNull().deleteFromDocument(this);
            this.setCanvasOrNull(null);
        };
        AView.prototype.drawOld = function () {
            //var canvasOrNull : ICanvas;
            //var drawCount : number;
            var imageData;
            //var models2Hide : Array<IModel> = this.observedModels2Hide;// this.getObservedModels2Hide();
            //var models2Show : Array<IModel> = this.observedModels2Show; //this.getObservedModels2Show();
            var modelIndex;
            //var model : IModel;
            var pixel;
            //var pixelPosition : IPosition;
            //var pixelPositionX : number;
            //var pixelPositionY : number;
            //var pixelColor : IColor;
            var imageDataIndex;
            //var viewExtent : IPosition;
            //            var viewExtentX : number;        
            //            var viewExtentY : number;     
            //var context : CanvasRenderingContext2D;   
            if (0 < this.observedModels2Hide.length || 0 < this.observedModels2Show.length) {
                //canvasOrNull = this.canvasOrNull;//this.getCanvasOrNull();
                //drawCount = this.drawCount; //this.getDrawCount();
                //viewExtent = this.getExtent();
                //viewExtentX = viewExtent.getX();
                //viewExtentY = viewExtent.getY();
                //                viewExtentX = this.width;
                //                viewExtentY = this.height;
                imageData = this.canvasOrNull.drawStart(this);
                //context = canvasOrNull.getContext();
                while (0 < this.observedModels2Hide.length) {
                    /*model = */ this.observedModels2Hide.pop();
                }
                //                models2Hide = []; // is this faster?
                while (0 < this.observedModels2Show.length) {
                    pixel = this.observedModels2Show.pop();
                    //for(modelIndex = 0; modelIndex < models2Show.length; ++modelIndex)
                    {
                        //model = models2Show[modelIndex];
                        //pixel = model as IPixel;
                        if (pixel) {
                            /*                            pixelPosition = pixel.getLocation();
                                                        pixelPositionX = pixelPosition.getX();
                                                        pixelPositionY = pixelPosition.getY();*/
                            //                            pixelPositionX = pixel.x;
                            //                            pixelPositionY = pixel.y;
                            if (pixel.x < this.width
                                && pixel.y < this.height) {
                                //pixelColor = pixel.getColor();
                                imageDataIndex = 4 * (pixel.y * this.width + pixel.x);
                                {
                                    /*                                    imageData.data[imageDataIndex + 0] = pixelColor.getR();
                                                                        imageData.data[imageDataIndex + 1] = pixelColor.getG();
                                                                        imageData.data[imageDataIndex + 2] = pixelColor.getB();
                                                                        imageData.data[imageDataIndex + 3] = pixelColor.getA();
                                    */
                                    imageData.data[imageDataIndex + 0] = pixel.r;
                                    imageData.data[imageDataIndex + 1] = pixel.g;
                                    imageData.data[imageDataIndex + 2] = pixel.b;
                                    imageData.data[imageDataIndex + 3] = pixel.a;
                                }
                            }
                        }
                    }
                }
                this.canvasOrNull.drawEnd(this, imageData);
                {
                    //drawCount++;
                    //this.drawCount = drawCount;//.setDrawCount(drawCount);
                    this.drawCount++;
                }
            }
        };
        AView.prototype.startObservingModel = function (model) {
            var observedModels = this.getObservedModels();
            observedModels.push(model);
            this.notifyObservedModelShow(model);
        };
        AView.prototype.isObservingModel = function (model) {
            var observedModels = this.getObservedModels();
            var index = observedModels.indexOf(model);
            return 0 <= index;
        };
        AView.prototype.notifyObservedModelHide = function (model) {
            var observedModels2Hide = this.observedModels2Hide; // this.getObservedModels2Hide();
            observedModels2Hide.push(model);
        };
        AView.prototype.notifyObservedModelShow = function (model) {
            var observedModels2Show = this.observedModels2Show; // this.getObservedModels2Show();
            observedModels2Show.push(model);
        };
        AView.prototype.stopObservingModel = function (model) {
            var observedModels = this.getObservedModels();
            var index = observedModels.indexOf(model);
            observedModels.splice(index, 1);
            this.notifyObservedModelHide(model);
        };
        AView.prototype.onPointsAdded = function (caller) {
            this.pointsChanged.push(caller); // TODO: Rename or change
        };
        AView.prototype.onPointsChanged = function (caller) {
            this.pointsChanged.push(caller);
        };
        AView.prototype.onPointsRemoved = function (caller) {
            this.pointsRemoved.push(caller);
        };
        AView.prototype.draw = function () {
            var imageData;
            var points;
            var point;
            var pointIndex;
            var imageDataIndex;
            var x;
            var y;
            var r;
            var g;
            var b;
            var a;
            var k;
            if (0 < this.pointsChanged.length || 0 < this.pointsRemoved.length) {
                imageData = this.canvasOrNull.drawStart(this);
                //context = canvasOrNull.getContext();
                while (0 < this.pointsRemoved.length) {
                    points = this.pointsRemoved.pop();
                    x = (points.world.x + points.dx) - this.x;
                    y = (points.world.y + points.dy) - this.y;
                    imageDataIndex = 4 * (y * this.width + x);
                    {
                        imageData.data[imageDataIndex + 0] = this.r;
                        imageData.data[imageDataIndex + 1] = this.g;
                        imageData.data[imageDataIndex + 2] = this.b;
                        imageData.data[imageDataIndex + 3] = this.a;
                    }
                }
                while (0 < this.pointsChanged.length) {
                    points = this.pointsChanged.pop();
                    x = (points.world.x + points.dx) - this.x;
                    y = (points.world.y + points.dy) - this.y;
                    imageDataIndex = 4 * (y * this.width + x);
                    {
                        r = this.r;
                        g = this.g;
                        b = this.b;
                        a = this.a;
                    }
                    {
                        for (pointIndex = 0; pointIndex < points.points.length; ++pointIndex) {
                            point = points.points[pointIndex];
                            if (255 <= point.a) {
                                r = point.r;
                                g = point.g;
                                b = point.b;
                                a = point.a;
                            }
                            else {
                                // collapse alpha effect
                                //r = (a * r) / 255;
                                //g = (a * g) / 255;
                                //b = (a * b) / 255;
                                //a = 255;
                                // blend 2 colors
                                r = (((255 - point.a) * r) + (point.a * point.r)) / 255;
                                g = (((255 - point.a) * g) + (point.a * point.g)) / 255;
                                b = (((255 - point.a) * b) + (point.a * point.b)) / 255;
                                a = (((255 - point.a) * a) + (point.a * point.a)) / 255;
                            }
                            break; // TODO: add alpha blending
                        }
                    }
                    {
                        imageData.data[imageDataIndex + 0] = r;
                        imageData.data[imageDataIndex + 1] = g;
                        imageData.data[imageDataIndex + 2] = b;
                        imageData.data[imageDataIndex + 3] = a;
                    }
                }
                this.canvasOrNull.drawEnd(this, imageData);
                {
                    this.drawCount++;
                }
            }
        };
        return AView;
    })(Volary.AInstance);
    Volary.AView = AView;
})(Volary || (Volary = {}));
/// <reference path="APosition.ts" />
var Volary;
(function (Volary) {
    /**
     * Default Position implementation.
     */
    var Position = (function (_super) {
        __extends(Position, _super);
        function Position() {
            _super.call(this);
            this.initInstance("Position", Position.positionInstanceIndex);
            this.setX(0);
            this.setY(0);
            this.setZ(0);
            Position.positionInstanceIndex++;
        }
        Position.positionInstanceIndex = 0;
        return Position;
    })(Volary.APosition);
    Volary.Position = Position;
})(Volary || (Volary = {}));
/// <reference path="AView.ts" />
/// <reference path="../instances/positions/Position.ts" />
var Volary;
(function (Volary) {
    /**
     * Default view implementation.
     */
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            _super.call(this);
            this.initInstance("View", View.viewInstanceIndex);
            this.volaryOrNull = null;
            this.viewsOrNull = null;
            this.setCanvasOrNull(null);
            //this.setLocation(new Position());
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            //this.setExtent(new Position());
            this.width = 0;
            this.height = 0;
            this.depth = 0;
            this.pointsChanged = new Array();
            this.pointsRemoved = new Array();
            View.viewInstanceIndex++;
        }
        View.viewInstanceIndex = 0;
        return View;
    })(Volary.AView);
    Volary.View = View;
})(Volary || (Volary = {}));
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/IInstance.ts" />
/// <reference path="../properties/ILocationProperty.ts" />
/// <reference path="../properties/IExtentProperty.ts" />
/// <reference path="../models/IModelObserver.ts" />
/// <reference path="../IView.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract model container implementation.
     */
    var AModels = (function (_super) {
        __extends(AModels, _super);
        function AModels() {
            _super.call(this);
            //        public getVolary() : IVolary
            //        {
            //            return this.volary;
            //        }
            //        protected setVolary(volary : IVolary) : void
            //        {
            //            this.volary = volary;
            //        }
            this.models = new Array();
            this.modelObservers = new Array();
        }
        AModels.prototype.getModels = function () {
            return this.models;
        };
        AModels.prototype.setModels = function (models) {
            this.models = models;
        };
        AModels.prototype.getModelObservers = function () {
            return this.modelObservers;
        };
        AModels.prototype.setModelObservers = function (modelObservers) {
            this.modelObservers = modelObservers;
        };
        AModels.prototype.initInstance = function (type, typeInstanceIndex, volary) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
            if (volary) {
                //                this.setVolary(volary);
                this.volary = volary;
            }
        };
        AModels.prototype.getModelCount = function () {
            return this.getModels().length;
        };
        AModels.prototype.getModelByIndex = function (index) {
            var model = this.getModels()[index];
            return model;
        };
        AModels.prototype.addModel = function (model) {
            var modelObservers = this.getModelObservers();
            var modelObserver;
            var modelObserverIndex;
            this.getModels().push(model);
            //model.setModelsOrNull(this);
            model.modelsOrNull = this;
            for (modelObserverIndex = 0; modelObserverIndex < modelObservers.length; ++modelObserverIndex) {
                modelObserver = modelObservers[modelObserverIndex];
                modelObserver.startObservingModel(model);
            }
        };
        AModels.prototype.removeModel = function (model) {
            var modelObservers = this.getModelObservers();
            var modelObserver;
            var modelObserverIndex;
            var models = this.getModels();
            var index = models.indexOf(model);
            for (modelObserverIndex = 0; modelObserverIndex < modelObservers.length; ++modelObserverIndex) {
                modelObserver = modelObservers[modelObserverIndex];
                modelObserver.stopObservingModel(model);
            }
            //model.setModelsOrNull(null);
            model.modelsOrNull = null;
            models.splice(index, 1);
        };
        AModels.prototype.addModelObserver = function (modelObserver) {
            var models = this.getModels();
            var model;
            var modelIndex;
            for (modelIndex = 0; modelIndex < models.length; ++modelIndex) {
                model = models[modelIndex];
                modelObserver.startObservingModel(model);
            }
            this.getModelObservers().push(modelObserver);
        };
        AModels.prototype.notifyModelChangesBegin = function (caller) {
            var modelObservers = this.modelObservers; //this.getModelObservers();
            var modelObserverIndex;
            var modelObserver;
            for (modelObserverIndex = 0; modelObserverIndex < modelObservers.length; ++modelObserverIndex) {
                modelObserver = modelObservers[modelObserverIndex];
                modelObserver.notifyObservedModelHide(caller);
            }
        };
        AModels.prototype.notifyModelChangesEnd = function (caller) {
            var modelObservers = this.modelObservers; //this.getModelObservers();
            var modelObserverIndex;
            var modelObserver;
            for (modelObserverIndex = 0; modelObserverIndex < modelObservers.length; ++modelObserverIndex) {
                modelObserver = modelObservers[modelObserverIndex];
                modelObserver.notifyObservedModelShow(caller);
            }
        };
        AModels.prototype.removeModelObserver = function (modelObserver) {
            var modelObservers = this.getModelObservers();
            var index = modelObservers.indexOf(modelObserver);
            var models = this.getModels();
            var model;
            var modelIndex;
            for (modelIndex = 0; modelIndex < models.length; ++modelIndex) {
                model = models[modelIndex];
                modelObserver.stopObservingModel(model);
            }
            modelObservers.splice(index, 1);
        };
        return AModels;
    })(Volary.AInstance);
    Volary.AModels = AModels;
})(Volary || (Volary = {}));
/// <reference path="../../instances/AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of point.
     */
    var APoint = (function (_super) {
        __extends(APoint, _super);
        function APoint() {
            _super.call(this);
        }
        APoint.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        APoint.prototype.changeR = function (r) {
            this.r = r;
            if (this.pointsOrNull) {
                if (this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame) {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        };
        APoint.prototype.changeG = function (g) {
            this.g = g;
            if (this.pointsOrNull) {
                if (this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame) {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        };
        APoint.prototype.changeB = function (b) {
            this.b = b;
            if (this.pointsOrNull) {
                if (this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame) {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        };
        APoint.prototype.changeA = function (a) {
            this.a = a;
            if (this.pointsOrNull) {
                if (this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame) {
                    this.pointsOrNull.updatePointColor(this);
                }
            }
        };
        APoint.prototype.change = function (x, y, z, r, g, b, a) {
            //var worldOrNull = null;
            if (this.pointsOrNull) {
                //if(this.pointsOrNull.frameModfied < this.pointsOrNull.volary.currentFrame)
                {
                    //worldOrNull = this.pointsOrNull.world;
                    //this.pointsOrNull.world.removePoint(this);
                    this.pointsOrNull.updatePointColor(this);
                }
            }
            //            if(x)
            {
                this.x = x;
            }
            //            if(y)
            {
                this.y = y;
            }
            //            if(z)
            {
                this.z = z;
            }
            //            if(r)
            {
                this.r = r;
            }
            //            if(g)
            {
                this.g = g;
            }
            //            if(b)
            {
                this.b = b;
            }
            //            if(a)
            {
                this.a = a;
            }
            //            if(worldOrNull)
            //            {
            //                worldOrNull.addPoint(this);
            //            }
        };
        return APoint;
    })(Volary.AInstance);
    Volary.APoint = APoint;
})(Volary || (Volary = {}));
/// <reference path="APoint.ts" />
var Volary;
(function (Volary) {
    /**
     * Default point implementation.
     */
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point() {
            _super.call(this);
            this.initInstance("Point", Point.pointInstanceIndex);
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            this.pointsOrNull = null;
            Point.pointInstanceIndex++;
        }
        Point.pointInstanceIndex = 0;
        return Point;
    })(Volary.APoint);
    Volary.Point = Point;
})(Volary || (Volary = {}));
/// <reference path="../IVolary.ts" />
/// <reference path="AModels.ts" />
var Volary;
(function (Volary) {
    /**
     * Default model container implementation.
     */
    var Models = (function (_super) {
        __extends(Models, _super);
        function Models(volary) {
            _super.call(this);
            this.initInstance("Models", Models.modelsInstanceIndex, volary);
            Models.modelsInstanceIndex++;
        }
        Models.modelsInstanceIndex = 0;
        return Models;
    })(Volary.AModels);
    Volary.Models = Models;
})(Volary || (Volary = {}));
/// <reference path="../IVolary.ts" />
/// <reference path="../instances/AInstance.ts" />
/// <reference path="../models/IModels.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract view container implementation.
     */
    var AViews = (function (_super) {
        __extends(AViews, _super);
        function AViews() {
            _super.call(this);
            this.views = new Array();
            this.drawViewsCount = 0;
        }
        AViews.prototype.getVolary = function () {
            return this.volary;
        };
        AViews.prototype.setVolary = function (volary) {
            this.volary = volary;
        };
        AViews.prototype.getViews = function () {
            return this.views;
        };
        AViews.prototype.setViews = function (views) {
            this.views = views;
        };
        AViews.prototype.getDrawViewsCount = function () {
            return this.drawViewsCount;
        };
        AViews.prototype.setDrawViewsCount = function (drawViewsCount) {
            this.drawViewsCount = drawViewsCount;
        };
        AViews.prototype.initInstance = function (type, typeInstanceIndex, volary) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
            if (volary) {
                this.setVolary(volary);
            }
        };
        AViews.prototype.getViewCount = function () {
            return this.getViews().length;
        };
        AViews.prototype.getViewByIndex = function (index) {
            var view = this.getViews()[index];
            return view;
        };
        AViews.prototype.addView = function (view) {
            var volary = this.getVolary();
            this.getViews().push(view);
            view.volaryOrNull = volary;
            view.viewsOrNull = this;
            //volary.getModels().addModelObserver(view);
            //volary.worlds.
        };
        AViews.prototype.getViewByInstanceId = function (id) {
            var viewOrNull = null;
            for (var index = 0; index < this.views.length; ++index) {
                var view = this.views[index];
                if (view.getId().valueOf() == id.valueOf()) {
                    viewOrNull = view;
                    break;
                }
            }
            return viewOrNull;
        };
        AViews.prototype.removeView = function (view) {
            var volary = this.getVolary();
            var views = this.getViews();
            var index = views.indexOf(view);
            //volary.getModels().removeModelObserver(view);
            views.splice(index, 1);
            view.viewsOrNull = null;
            view.volaryOrNull = null;
        };
        AViews.prototype.drawViews = function () {
            var views = this.getViews();
            var index = 0;
            var view;
            var drawViewsCount = this.drawViewsCount; // this.getDrawViewsCount();
            for (index = 0; index < views.length; ++index) {
                view = views[index];
                view.draw();
            }
            {
                ++drawViewsCount;
                this.drawViewsCount = drawViewsCount; //this.setDrawViewsCount(drawViewsCount);
            }
        };
        return AViews;
    })(Volary.AInstance);
    Volary.AViews = AViews;
})(Volary || (Volary = {}));
/// <reference path="../IVolary.ts" />
/// <reference path="AViews.ts" />
var Volary;
(function (Volary) {
    /**
     * Default view container implementation.
     */
    var Views = (function (_super) {
        __extends(Views, _super);
        function Views(volary) {
            _super.call(this);
            this.initInstance("Views", Views.viewsInstanceIndex, volary);
            Views.viewsInstanceIndex++;
        }
        Views.viewsInstanceIndex = 0;
        return Views;
    })(Volary.AViews);
    Volary.Views = Views;
})(Volary || (Volary = {}));
/// <reference path="instances/AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of Volary.
     */
    var AVolary = (function (_super) {
        __extends(AVolary, _super);
        function AVolary() {
            _super.call(this);
        }
        AVolary.prototype.getVersion = function () {
            return this.version;
        };
        AVolary.prototype.setVersion = function (version) {
            this.version = version;
        };
        AVolary.prototype.getViews = function () {
            return this.views;
        };
        AVolary.prototype.setViews = function (views) {
            this.views = views;
        };
        /**
         * Retrieves the time of the frame currently targeted.
         */
        AVolary.prototype.getCurrentFrameTime = function () {
            return this.currentFrameTime;
        };
        AVolary.prototype.setCurrentFrameTime = function (currentFrameTime) {
            this.currentFrameTime = currentFrameTime;
        };
        /**
         * Retrieves the time between the frame currently targeted and the previous frame.
         */
        AVolary.prototype.getCurrentFrameDeltaTime = function () {
            return this.currentFrameDeltaTime;
        };
        AVolary.prototype.setCurrentFrameDeltaTime = function (currentFrameDeltaTime) {
            this.currentFrameDeltaTime = currentFrameDeltaTime;
        };
        AVolary.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        /**
         * Method to call before modifying models and rendering views.
         *
         * Usually the first volary method call in window.requestAnimationFrame
         */
        AVolary.prototype.beginFrame = function (timeMS) {
            var previousFrameTime = this.getCurrentFrameTime();
            var deltaFrameTime = timeMS - previousFrameTime;
            this.setCurrentFrameTime(timeMS);
            this.setCurrentFrameDeltaTime(deltaFrameTime);
        };
        /**
          * Method to call after modifying models and rendering views.
          *
          * Usually the last volary method call in window.requestAnimationFrame
          */
        AVolary.prototype.endFrame = function () {
            //var currentFrame : number = this.getCurrentFrame();
            //this.setCurrentFrame(currentFrame + 1); // all model changes will be marked with this
            this.currentFrame += 1;
            this.setCurrentFrameDeltaTime(0); // we don't know this yet
        };
        return AVolary;
    })(Volary.AInstance);
    Volary.AVolary = AVolary;
})(Volary || (Volary = {}));
/// <reference path="../instances/AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of worlds.
     */
    var AWorlds = (function (_super) {
        __extends(AWorlds, _super);
        function AWorlds() {
            _super.call(this);
        }
        AWorlds.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        AWorlds.prototype.createWorld = function (x, y, z, width, height, depth) {
            var world;
            world = new Volary.World(this.volary, this, x, y, z, width, height, depth);
            this.addWorld(world);
            return world;
        };
        AWorlds.prototype.getWorldByInstanceId = function (id) {
            var worldOrNull = null;
            for (var index = 0; index < this.worlds.length; ++index) {
                var world = this.worlds[index];
                if (world.getId().valueOf() == id.valueOf()) {
                    worldOrNull = world;
                    break;
                }
            }
            return worldOrNull;
        };
        AWorlds.prototype.deleteWorld = function (world) {
            this.removeWorld(world);
        };
        AWorlds.prototype.addWorld = function (world) {
            this.worlds.push(world);
        };
        AWorlds.prototype.removeWorld = function (world) {
            var index = this.worlds.indexOf(world);
            this.worlds.splice(index, 1);
        };
        return AWorlds;
    })(Volary.AInstance);
    Volary.AWorlds = AWorlds;
})(Volary || (Volary = {}));
/// <reference path="AWorlds.ts" />
var Volary;
(function (Volary) {
    /**
     * Default worlds implementation.
     */
    var Worlds = (function (_super) {
        __extends(Worlds, _super);
        function Worlds(volary) {
            _super.call(this);
            this.initInstance("Worlds", Worlds.worldsInstanceIndex);
            this.volary = volary;
            this.worlds = new Array();
            Worlds.worldsInstanceIndex++;
        }
        Worlds.worldsInstanceIndex = 0;
        return Worlds;
    })(Volary.AWorlds);
    Volary.Worlds = Worlds;
})(Volary || (Volary = {}));
/// <reference path="AVolary.ts" />
/// <reference path="worlds/Worlds.ts" />
var Volary;
(function (Volary_1) {
    /**
     * Default implementation of Volary root instance.
     */
    var Volary = (function (_super) {
        __extends(Volary, _super);
        /**
         * Constructs Volary with version and empty containers for models and views.
         */
        function Volary() {
            _super.call(this);
            this.initInstance("Volary", Volary.volaryInstanceIndex);
            Volary.volaryInstanceIndex++;
            this.setVersion("0.0.2");
            //this.setModels(new Models(this));
            this.worlds = new Volary_1.Worlds(this);
            this.setViews(new Volary_1.Views(this));
            //            this.setCurrentFrame(1);
            this.currentFrame = 1;
            this.setCurrentFrameTime(0);
            this.setCurrentFrameDeltaTime(0);
        }
        Volary.volaryInstanceIndex = 0;
        return Volary;
    })(Volary_1.AVolary);
    Volary_1.Volary = Volary;
})(Volary || (Volary = {}));
/// <reference path="../instances/colors/IColor.ts" />
/// <reference path="../../properties/ILocationProperty.ts" />
/// <reference path="../../properties/IColorProperty.ts" />
/// <reference path="../instances/AInstance.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract implementation of world.
     */
    var AWorld = (function (_super) {
        __extends(AWorld, _super);
        function AWorld() {
            _super.call(this);
        }
        AWorld.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        AWorld.prototype.addPoint = function (point) {
            if ((this.x <= point.x && point.x < this.x + this.width)
                && (this.y <= point.y && point.y < this.y + this.height)
                && (this.z <= point.z && point.z < this.z + this.depth)) {
                this.pointsInside[point.x - this.x][point.y - this.y].addPoint(this, point);
            }
            else {
                this.pointsOutside.addPoint(this, point);
            }
        };
        AWorld.prototype.removePoint = function (point) {
            if ((this.x <= point.x && point.x < this.x + this.width)
                && (this.y <= point.y && point.y < this.y + this.height)
                && (this.z <= point.z && point.z < this.z + this.depth)) {
                this.pointsInside[point.x - this.x][point.y - this.y].removePoint(this, point);
            }
            else {
                this.pointsOutside.removePoint(this, point);
            }
        };
        AWorld.prototype.addObserver = function (caller) {
            for (var dy = 0; dy < this.height; ++dy) {
                for (var dx = 0; dx < this.width; ++dx) {
                    var pointsInside = this.pointsInside[dx][dy];
                    var x = this.x + dx;
                    var y = this.y + dy;
                    if ((caller.x <= x && x < caller.x + caller.width)
                        && (caller.y <= y && y < caller.y + caller.height)) {
                        pointsInside.registerView(caller);
                    }
                }
            }
            this.viewsObserving.push(caller);
        };
        AWorld.prototype.hasObserver = function (caller) {
            return (0 <= this.viewsObserving.indexOf(caller));
        };
        AWorld.prototype.removeObserver = function (caller) {
            var index = this.viewsObserving.indexOf(caller);
            for (var dy = 0; dy < this.height; ++dy) {
                for (var dx = 0; dx < this.width; ++dx) {
                    var pointsInside = this.pointsInside[dx][dy];
                    var x = this.x + dx;
                    var y = this.y + dy;
                    if ((caller.x <= x && x < caller.x + caller.width)
                        && (caller.y <= y && y < caller.y + caller.height)) {
                        pointsInside.unregisterView(caller);
                    }
                }
            }
            this.viewsObserving.splice(index, 1);
        };
        return AWorld;
    })(Volary.AInstance);
    Volary.AWorld = AWorld;
})(Volary || (Volary = {}));
/// <reference path="APixel.ts" />
/// <reference path="../../instances/positions/Position.ts" />
/// <reference path="../../instances/colors/Color.ts" />
var Volary;
(function (Volary) {
    /**
     * Default pixel implementation.
     */
    var Pixel = (function (_super) {
        __extends(Pixel, _super);
        function Pixel() {
            _super.call(this);
            this.initInstance("Pixel", Pixel.pixelInstanceIndex);
            //this.setLocation(new Position());
            this.x = 0;
            this.y = 0;
            this.z = 0;
            //this.setColor(new Color());
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            this.frameModified = 0;
            this.modelsOrNull = null;
            Pixel.pixelInstanceIndex++;
        }
        Pixel.pixelInstanceIndex = 0;
        return Pixel;
    })(Volary.APixel);
    Volary.Pixel = Pixel;
})(Volary || (Volary = {}));
/// <reference path="AWorld.ts" />
/// <reference path="points/Points.ts" />
var Volary;
(function (Volary) {
    /**
     * Default world implementation.
     */
    var World = (function (_super) {
        __extends(World, _super);
        function World(volary, worlds, x, y, z, width, height, depth) {
            _super.call(this);
            this.initInstance("World", World.worldInstanceIndex);
            this.volary = volary;
            this.worlds = worlds;
            this.x = x;
            this.y = y;
            this.z = z;
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.pointsOutside = new Volary.Points(volary, this, -1, -1);
            this.pointsInside = new Array(); //[height];
            for (var dx = 0; dx < width; ++dx) {
                this.pointsInside.push(new Array());
                for (var dy = 0; dy < height; ++dy) {
                    this.pointsInside[dx].push(new Volary.Points(volary, this, dx, dy));
                }
            }
            this.viewsObserving = new Array();
            World.worldInstanceIndex++;
        }
        World.worldInstanceIndex = 0;
        return World;
    })(Volary.AWorld);
    Volary.World = World;
})(Volary || (Volary = {}));
