/// <reference path="../instances/AInstance.ts" />
/// <reference path="../instances/positions/IPosition.ts" />
/// <reference path="../instances/colors/Color.ts" />
/// <reference path="canvases/Canvas.ts" />
module Volary {

    /**
     * Abstract view implementation.
     */
    export abstract class AView extends AInstance implements IView {
        public volaryOrNull : IVolary;
        public viewsOrNull : IViews;
        private canvasOrNull: ICanvas = null;
        protected getCanvasOrNull() : ICanvas
        {
            return this.canvasOrNull;
        }
        protected setCanvasOrNull(canvasOrNull: ICanvas) : void
        {
            this.canvasOrNull = canvasOrNull;
        }
        
/*        private location : IPosition;
        public getLocation() : IPosition
        {
            return this.location;
        }
        protected setLocation(location : IPosition) : void
        {
            this.location = location;
        }
*/
        public x : number;
        public y : number;
        public z : number;
        public changeXyz(color : {x?:number, y?:number, z?:number}) : void
        {
            if(null != this.volaryOrNull)
            {
                var worldsObserved : Array<IWorld> = new Array<IWorld>();
                for(var index = 0; index < this.volaryOrNull.worlds.worlds.length; ++index)
                {
                    var world = this.volaryOrNull.worlds.worlds[index];
                    if(world.hasObserver(this))
                    {
                        worldsObserved.push(world);
                        world.removeObserver(this);
                    }
                }
                
                if(color.x)
                {
                    this.x = color.x;
                }
                if(color.y)
                {
                    this.y = color.y;
                }
                if(color.z)
                {
                    this.z = color.z;
                }
                if(null != this.canvasOrNull)
                {
                    this.canvasOrNull.resetImageData(this.r, this.g, this.b, this.a);
                }

                for(var index = 0; index < worldsObserved.length; ++index)
                {
                    var world = worldsObserved[index];
                    world.addObserver(this);
                }
            }
        }
                
        public r : number;
        public g : number;
        public b : number;
        public a : number;
        public changeRgba(color : {r?:number, g?:number, b?:number, a?:number}) : void
        {
            if(color.r)
            {
                this.r = color.r;
            }
            if(color.g)
            {
                this.g = color.g;
            }
            if(color.b)
            {
                this.b = color.b;
            }
            if(color.a)
            {
                this.a = color.a;
            }
            if(null != this.volaryOrNull)
            {
                var worldsObserved : Array<IWorld> = new Array<IWorld>();
                for(var index = 0; index < this.volaryOrNull.worlds.worlds.length; ++index)
                {
                    var world = this.volaryOrNull.worlds.worlds[index];
                    if(world.hasObserver(this))
                    {
                        worldsObserved.push(world);
                        world.removeObserver(this);
                    }
                }
                if(null != this.canvasOrNull)
                {
                    this.canvasOrNull.resetImageData(this.r, this.g, this.b, this.a);
                }
                for(var index = 0; index < worldsObserved.length; ++index)
                {
                    var world = worldsObserved[index];
                    world.addObserver(this);
                }
            }
        }
/*        private extent : IPosition;
        public getExtent() : IPosition
        {
            return this.extent;
        }
        protected setExtent(extent : IPosition) : void
        {
            this.extent = extent;
        }
*/
        public width : number;
        public height : number;
        public depth : number;
        public changeWidthHeightDepth(color : {width?:number, height?:number, depth?:number}) : void
        {
            if(null != this.volaryOrNull)
            {
                var worldsObserved : Array<IWorld> = new Array<IWorld>();
                for(var index = 0; index < this.volaryOrNull.worlds.worlds.length; ++index)
                {
                    var world = this.volaryOrNull.worlds.worlds[index];
                    if(world.hasObserver(this))
                    {
                        worldsObserved.push(world);
                        world.removeObserver(this);
                    }
                }
                
                if(color.width)
                {
                    this.width = color.width;
                }
                if(color.height)
                {
                    this.height = color.height;
                }
                if(color.depth)
                {
                    this.depth = color.depth;
                }
                if(null != this.canvasOrNull)
                {
                    this.canvasOrNull.resize(this.width, this.height);
                    this.canvasOrNull.resetImageData(this.r, this.g, this.b, this.a);
                }

                for(var index = 0; index < worldsObserved.length; ++index)
                {
                    var world = worldsObserved[index];
                    world.addObserver(this);
                }
            }
        }                
        private drawCount : number = 0;
        public getDrawCount() : number
        {
            return this.drawCount;
        }
        protected setDrawCount(drawCount : number) : void
        {
            this.drawCount = drawCount;
        }

        private observedModels: Array<IModel> = new Array<IModel>();
        protected getObservedModels() : Array<IModel>
        {
            return this.observedModels;
        }
        protected setObservedModels(observedModels : Array<IModel>) : void
        {
            this.observedModels = observedModels;
        }

        private observedModels2Hide: Array<IModel> = new Array<IModel>();
        protected getObservedModels2Hide() : Array<IModel>
        {
            return this.observedModels2Hide;
        }
        protected setObservedModels2Hided(observedModels2Hide : Array<IModel>) : void
        {
            this.observedModels2Hide = observedModels2Hide;
        }

        private observedModels2Show: Array<IModel> = new Array<IModel>();
        protected getObservedModels2Show() : Array<IModel>
        {
            return this.observedModels2Show;
        }
        protected setObservedModels2Showd(observedModels2Show : Array<IModel>) : void
        {
            this.observedModels2Show = observedModels2Show;
        }

        public pointsAdded : Array<IPoints>;
        public pointsChanged : Array<IPoints>;
        public pointsRemoved : Array<IPoints>;
        
        constructor() 
        {
            super();
        }
        protected initInstance(type: string, typeInstanceIndex: number) : void
        {
            super.initInstance(type, typeInstanceIndex); 
        }
        
        public constructCanvas() : void
        {
            var canvas = new Canvas();
            canvas.createInDocument(this);
            this.setCanvasOrNull(canvas);
        }
        public attachCanvas(elementId : string) : void
        {
            var canvas = new Canvas();
            var element : HTMLCanvasElement;
            element = document.getElementById(elementId) as HTMLCanvasElement;
/*            this.getExtent().setX(element.width);
            this.getExtent().setY(element.height);
*/
            this.width = element.width;
            this.height = element.height;
            canvas.attachToDocument(this, elementId);
            this.setCanvasOrNull(canvas);
        }
        public detachCanvas() : void
        {
            this.getCanvasOrNull().detachFromDocument(this);
            this.setCanvasOrNull(null);
        }
        public destructCanvas() : void
        {
            this.getCanvasOrNull().deleteFromDocument(this);
            this.setCanvasOrNull(null);
        }
        
        public drawOld() : void
        {
            //var canvasOrNull : ICanvas;
            //var drawCount : number;
            var imageData : ImageData;
            //var models2Hide : Array<IModel> = this.observedModels2Hide;// this.getObservedModels2Hide();
            //var models2Show : Array<IModel> = this.observedModels2Show; //this.getObservedModels2Show();
            var modelIndex : number;
            //var model : IModel;
            var pixel : IPixel;
            //var pixelPosition : IPosition;
            //var pixelPositionX : number;
            //var pixelPositionY : number;
            //var pixelColor : IColor;
            var imageDataIndex : number;
            //var viewExtent : IPosition;
//            var viewExtentX : number;        
//            var viewExtentY : number;     
            //var context : CanvasRenderingContext2D;   
        
            if(0 < this.observedModels2Hide.length || 0 < this.observedModels2Show.length)
            {
                //canvasOrNull = this.canvasOrNull;//this.getCanvasOrNull();
                //drawCount = this.drawCount; //this.getDrawCount();
                //viewExtent = this.getExtent();
                //viewExtentX = viewExtent.getX();
                //viewExtentY = viewExtent.getY();
//                viewExtentX = this.width;
//                viewExtentY = this.height;
                imageData = this.canvasOrNull.drawStart(this);
                //context = canvasOrNull.getContext();
                
                while(0 < this.observedModels2Hide.length)
                { // TODO: this doesn't work - we need to mark a pixel to redraw itself instead
                    /*model = */this.observedModels2Hide.pop();
                }
//                models2Hide = []; // is this faster?
                        
                while(0 < this.observedModels2Show.length)
                { // TODO: make this better
                
                    pixel = this.observedModels2Show.pop() as IPixel;
                    //for(modelIndex = 0; modelIndex < models2Show.length; ++modelIndex)
                    {
                        //model = models2Show[modelIndex];
                        //pixel = model as IPixel;
                        if(pixel)
                        {
/*                            pixelPosition = pixel.getLocation();
                            pixelPositionX = pixelPosition.getX();
                            pixelPositionY = pixelPosition.getY();*/
//                            pixelPositionX = pixel.x;
//                            pixelPositionY = pixel.y;
                            if(pixel.x < this.width 
                                && pixel.y < this.height)
                            {
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
                                
                                //context.fillStyle = pixelColor.getRgbaString();
                                //context.fillRect(pixelPositionX, pixelPositionY, 1, 1);
                            }
                        }
                    }
                    //models2Show = []; // is this faster?
                }
                
                this.canvasOrNull.drawEnd(this, imageData);
                {
                    //drawCount++;
                    //this.drawCount = drawCount;//.setDrawCount(drawCount);
                    this.drawCount++;
                }
            }
        }
        
        
        public startObservingModel(model : IModel) : void
        {
            var observedModels : Array<IModel> = this.getObservedModels();
            observedModels.push(model);
            this.notifyObservedModelShow(model);
        }
        
        public isObservingModel(model : IModel) : Boolean
        {
            var observedModels : Array<IModel> = this.getObservedModels();
            var index = observedModels.indexOf(model);
            return 0 <= index;
        }

        public notifyObservedModelHide(model : IModel) : void
        {
            var observedModels2Hide : Array<IModel> = this.observedModels2Hide;// this.getObservedModels2Hide();
            observedModels2Hide.push(model);
        }
        
        public notifyObservedModelShow(model : IModel) : void
        {
            var observedModels2Show : Array<IModel> = this.observedModels2Show;// this.getObservedModels2Show();
            observedModels2Show.push(model);
        }

        public stopObservingModel(model : IModel) : void
        {
            var observedModels : Array<IModel> = this.getObservedModels();
            var index = observedModels.indexOf(model);
            observedModels.splice(index, 1);
            this.notifyObservedModelHide(model);
        }
        
        public onPointsAdded(caller : IPoints) : void
        {
            this.pointsChanged.push(caller); // TODO: Rename or change
        }
        
        public onPointsChanged(caller : IPoints) : void
        {
            this.pointsChanged.push(caller);
        }
        
        public onPointsRemoved(caller : IPoints) : void
        {
            this.pointsRemoved.push(caller);
        }
        
        public draw() : void
        {
            var imageData : ImageData;
            var points : IPoints;
            var point : IPoint;
            var pointIndex : number;
            var imageDataIndex : number;
            var x : number;
            var y : number;
            var r : number;
            var g : number;
            var b : number;
            var a : number;
            var k : number;
        
            if(0 < this.pointsChanged.length || 0 < this.pointsRemoved.length)
            {
                imageData = this.canvasOrNull.drawStart(this);
                //context = canvasOrNull.getContext();

                while(0 < this.pointsRemoved.length)
                { 
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
                
                while(0 < this.pointsChanged.length)
                { 
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
                        for(pointIndex = 0; pointIndex < points.points.length; ++pointIndex)
                        {
                            point = points.points[pointIndex];
                            if(255 <= point.a)
                            {
                                r = point.r;
                                g = point.g;
                                b = point.b;
                                a = point.a;
                            }
                            else
                            {
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
        }

//        protected calculateImageDataIndex(position : IPosition, extent : IPosition) : number
//        {
//            var x : number = position.getX();
//            var y : number = position.getY();
//            var width : number = extent.getX();
//            return 4 * (y * width + x);
//        }
        

    }
}

