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
        AInstance.prototype.getId = function () { return this.id; };
        AInstance.prototype.setId = function (id) { this.id = id; };
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
     * Abstract view container implementation.
     */
    var AViews = (function (_super) {
        __extends(AViews, _super);
        function AViews() {
            _super.call(this);
            this.views = new Array();
        }
        AViews.prototype.getViews = function () {
            return this.views;
        };
        AViews.prototype.setViews = function (views) {
            this.views = views;
        };
        AViews.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        AViews.prototype.getViewCount = function () {
            return this.getViews().length;
        };
        AViews.prototype.getViewByIndex = function (index) {
            var view = this.getViews()[index];
            return view;
        };
        AViews.prototype.addView = function (view) {
            this.getViews().push(view);
        };
        AViews.prototype.removeView = function (view) {
            var views = this.getViews();
            var index = views.indexOf(view);
            views.splice(index, 1);
        };
        return AViews;
    })(Volary.AInstance);
    Volary.AViews = AViews;
})(Volary || (Volary = {}));
/// <reference path="../IInstance.ts" />
/// <reference path="../instances/colors/IColor.ts" />
var Volary;
(function (Volary) {
    /**
     * Abstract model container implementation.
     */
    var AModels = (function (_super) {
        __extends(AModels, _super);
        function AModels() {
            _super.call(this);
        }
        AModels.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        return AModels;
    })(Volary.AInstance);
    Volary.AModels = AModels;
})(Volary || (Volary = {}));
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
/// <reference path="../AModel.ts" />
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
/// <reference path="APixel.ts" />
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
            Pixel.pixelInstanceIndex++;
        }
        Pixel.pixelInstanceIndex = 0;
        return Pixel;
    })(Volary.AModel);
    Volary.Pixel = Pixel;
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
/// <reference path="../IView.ts" />
/// <reference path="AViews.ts" />
var Volary;
(function (Volary) {
    /**
     * Default view container implementation.
     */
    var Views = (function (_super) {
        __extends(Views, _super);
        function Views() {
            _super.call(this);
            this.initInstance("Views", Views.viewsInstanceIndex);
            Views.viewsInstanceIndex++;
        }
        Views.viewsInstanceIndex = 0;
        return Views;
    })(Volary.AViews);
    Volary.Views = Views;
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
        ACanvas.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        ACanvas.prototype.createInDocument = function (caller) {
            var element;
            var context;
            element = document.createElement('canvas');
            element.id = this.getId();
            element.width = caller.getWidth();
            element.height = caller.getHeight();
            document.getElementsByTagName('body')[0].appendChild(element);
            this.setElement(element);
            context = element.getContext("2d");
            this.setContext(context);
            context.fillStyle = caller.getBackgroundColor().getRgbaString();
            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
        };
        ACanvas.prototype.attachToDocument = function (caller, elementId) {
            var element;
            var context;
            element = document.getElementById(elementId);
            this.setId(elementId);
            caller.setHeight(element.height);
            caller.setWidth(element.width);
            this.setElement(element);
            context = element.getContext("2d");
            this.setContext(context);
            context.fillStyle = caller.getBackgroundColor().getRgbaString();
            context.fillRect(0, 0, caller.getWidth(), caller.getHeight());
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
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
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
            this.setViews(new Volary_1.Views());
        }
        Volary.volaryInstanceIndex = 0;
        return Volary;
    })(Volary_1.AVolary);
    Volary_1.Volary = Volary;
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
            Color.modelInstanceIndex++;
        }
        Color.modelInstanceIndex = 0;
        return Color;
    })(Volary.AColor);
    Volary.Color = Color;
})(Volary || (Volary = {}));
/// <reference path="../instances/AInstance.ts" />
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
            this.canvas = null;
            this.backgroundColor = new Volary.Color();
            this.height = 0;
            this.width = 0;
        }
        AView.prototype.getCanvas = function () {
            return this.canvas;
        };
        AView.prototype.setCanvas = function (canvas) {
            this.canvas = canvas;
        };
        AView.prototype.getBackgroundColor = function () {
            return this.backgroundColor;
        };
        AView.prototype.setBackgroundColor = function (backgroundColor) {
            this.backgroundColor = backgroundColor;
        };
        AView.prototype.getHeight = function () {
            return this.height;
        };
        AView.prototype.setHeight = function (height) {
            this.height = height;
        };
        AView.prototype.getWidth = function () {
            return this.width;
        };
        AView.prototype.setWidth = function (width) {
            this.width = width;
        };
        AView.prototype.initInstance = function (type, typeInstanceIndex) {
            _super.prototype.initInstance.call(this, type, typeInstanceIndex);
        };
        AView.prototype.constructCanvas = function () {
            var canvas = new Volary.Canvas();
            canvas.createInDocument(this);
            this.setCanvas(canvas);
        };
        AView.prototype.attachCanvas = function (elementId) {
            var canvas = new Volary.Canvas();
            canvas.attachToDocument(this, elementId);
            this.setCanvas(canvas);
        };
        AView.prototype.detachCanvas = function () {
            this.getCanvas().detachFromDocument(this);
            this.setCanvas(null);
        };
        AView.prototype.destructCanvas = function () {
            this.getCanvas().deleteFromDocument(this);
            this.setCanvas(null);
        };
        return AView;
    })(Volary.AInstance);
    Volary.AView = AView;
})(Volary || (Volary = {}));
/// <reference path="AView.ts" />
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
            View.viewInstanceIndex++;
        }
        View.viewInstanceIndex = 0;
        return View;
    })(Volary.AView);
    Volary.View = View;
})(Volary || (Volary = {}));
