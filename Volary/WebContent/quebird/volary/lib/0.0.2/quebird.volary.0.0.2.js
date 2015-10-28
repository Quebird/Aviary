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
        function AModel() {
            _super.call(this);
        }
        AModel.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        return AModel;
    })(Volary.AInstance);
    Volary.AModel = AModel;
})(Volary || (Volary = {}));
/// <reference path="../IInstance.ts" />
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
        APixel.prototype.getLocation = function () {
            return this.location;
        };
        APixel.prototype.setLocation = function (location) {
            this.location = location;
        };
        APixel.prototype.getColor = function () {
            return this.color;
        };
        APixel.prototype.setColor = function (color) {
            this.color = color;
        };
        APixel.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        return APixel;
    })(Volary.AModel);
    Volary.APixel = APixel;
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
            volary.getModels().addModelObserver(view);
        };
        AViews.prototype.removeView = function (view) {
            var volary = this.getVolary();
            var views = this.getViews();
            var index = views.indexOf(view);
            volary.getModels().removeModelObserver(view);
            views.splice(index, 1);
        };
        AViews.prototype.drawViews = function () {
            var views = this.getViews();
            var index = 0;
            var view;
            var drawViewsCount = this.getDrawViewsCount();
            for (index = 0; index < views.length; ++index) {
                view = views[index];
                view.draw();
            }
            {
                ++drawViewsCount;
                this.setDrawViewsCount(drawViewsCount);
            }
        };
        return AViews;
    })(Volary.AInstance);
    Volary.AViews = AViews;
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
        AVolary.prototype.getVersion = function () { return this.version; };
        AVolary.prototype.setVersion = function (version) { this.version = version; };
        AVolary.prototype.getModels = function () { return this.models; };
        AVolary.prototype.setModels = function (models) { this.models = models; };
        AVolary.prototype.getViews = function () { return this.views; };
        AVolary.prototype.setViews = function (views) { this.views = views; };
        AVolary.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        return AVolary;
    })(Volary.AInstance);
    Volary.AVolary = AVolary;
})(Volary || (Volary = {}));
/// <reference path="AVolary.ts" />
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
            this.setModels(new Volary_1.Models());
            this.setViews(new Volary_1.Views(this));
        }
        Volary.volaryInstanceIndex = 0;
        return Volary;
    })(Volary_1.AVolary);
    Volary_1.Volary = Volary;
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
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/colors/IColor.ts" />
/// <reference path="../../properties/ILocationProperty.ts" />
/// <reference path="../../properties/IColorProperty.ts" />
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
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/IInstance.ts" />
/// <reference path="../properties/ILocationProperty.ts" />
/// <reference path="../properties/IExtentProperty.ts" />
/// <reference path="../models/IModelObserver.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract model container implementation.
     */
    var AModels = (function (_super) {
        __extends(AModels, _super);
        function AModels() {
            _super.call(this);
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
        AModels.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
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
/// <reference path="AModels.ts" />
var Volary;
(function (Volary) {
    /**
     * Default model container implementation.
     */
    var Models = (function (_super) {
        __extends(Models, _super);
        function Models() {
            _super.call(this);
            this.initInstance("Models", Models.modelsInstanceIndex);
            Models.modelsInstanceIndex++;
        }
        Models.modelsInstanceIndex = 0;
        return Models;
    })(Volary.AModels);
    Volary.Models = Models;
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
            {
                element = document.createElement('canvas');
                element.id = this.getId();
                element.width = caller.getExtent().getX();
                element.height = caller.getExtent().getY();
                document.getElementsByTagName('body')[0].appendChild(element);
                this.setElement(element);
            }
            {
                context = element.getContext("2d");
                this.setContext(context);
            }
            {
                imageData = context.createImageData(caller.getExtent().getX(), caller.getExtent().getY());
                this.setImageData(imageData);
            }
            //            context.fillStyle = caller.getBackgroundColor().getRgbaString();
            //            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
        };
        ACanvas.prototype.attachToDocument = function (caller, elementId) {
            var element;
            var context;
            var imageData;
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
                imageData = context.createImageData(caller.getExtent().getX(), caller.getExtent().getY());
                this.setImageData(imageData);
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
        }
        AView.prototype.getCanvasOrNull = function () {
            return this.canvasOrNull;
        };
        AView.prototype.setCanvasOrNull = function (canvasOrNull) {
            this.canvasOrNull = canvasOrNull;
        };
        AView.prototype.getLocation = function () {
            return this.location;
        };
        AView.prototype.setLocation = function (location) {
            this.location = location;
        };
        AView.prototype.getExtent = function () {
            return this.extent;
        };
        AView.prototype.setExtent = function (extent) {
            this.extent = extent;
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
            this.getExtent().setX(element.width);
            this.getExtent().setY(element.height);
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
        AView.prototype.draw = function () {
            var canvasOrNull = this.getCanvasOrNull();
            var drawCount = this.getDrawCount();
            var imageData;
            var models = this.getObservedModels();
            var modelIndex;
            var model;
            var pixel;
            var pixelPosition;
            var pixelPositionX;
            var pixelPositionY;
            var pixelColor;
            var imageDataIndex;
            var viewExtent = this.getExtent();
            var viewExtentX = viewExtent.getX();
            var viewExtentY = viewExtent.getY();
            imageData = canvasOrNull.drawStart(this);
            {
                for (modelIndex = 0; modelIndex < models.length; ++modelIndex) {
                    model = models[modelIndex];
                    pixel = model;
                    if (pixel) {
                        pixelPosition = pixel.getLocation();
                        pixelPositionX = pixelPosition.getX();
                        pixelPositionY = pixelPosition.getY();
                        if (pixelPositionX < viewExtentX
                            && pixelPositionY < viewExtentX) {
                            pixelColor = pixel.getColor();
                            imageDataIndex = 4 * (pixelPositionY * viewExtentX + pixelPositionX);
                            {
                                imageData.data[imageDataIndex + 0] = pixelColor.getR();
                                imageData.data[imageDataIndex + 1] = pixelColor.getG();
                                imageData.data[imageDataIndex + 2] = pixelColor.getB();
                                imageData.data[imageDataIndex + 3] = pixelColor.getA();
                            }
                        }
                    }
                }
            }
            canvasOrNull.drawEnd(this, imageData);
            {
                drawCount++;
                this.setDrawCount(drawCount);
            }
        };
        AView.prototype.startObservingModel = function (model) {
            var observedModels = this.getObservedModels();
            observedModels.push(model);
        };
        AView.prototype.isObservingModel = function (model) {
            var observedModels = this.getObservedModels();
            var index = observedModels.indexOf(model);
            return 0 <= index;
        };
        AView.prototype.stopObservingModel = function (model) {
            var observedModels = this.getObservedModels();
            var index = observedModels.indexOf(model);
            observedModels.splice(index, 1);
        };
        return AView;
    })(Volary.AInstance);
    Volary.AView = AView;
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
            this.setCanvasOrNull(null);
            this.setLocation(new Volary.Position());
            this.setExtent(new Volary.Position());
            View.viewInstanceIndex++;
        }
        View.viewInstanceIndex = 0;
        return View;
    })(Volary.AView);
    Volary.View = View;
})(Volary || (Volary = {}));
/// <reference path="../IView.ts" />
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
            this.setLocation(new Volary.Position());
            this.setColor(new Volary.Color());
            Pixel.pixelInstanceIndex++;
        }
        Pixel.pixelInstanceIndex = 0;
        return Pixel;
    })(Volary.APixel);
    Volary.Pixel = Pixel;
})(Volary || (Volary = {}));
