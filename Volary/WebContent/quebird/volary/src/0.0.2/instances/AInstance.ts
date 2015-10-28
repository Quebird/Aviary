module Volary
{
    /**
     * Abstract implementation of generic base object.
     */
    export abstract class AInstance implements IInstance
    {
        private static instancesCreated: number = 0;
        protected static getInstancesCreated() : number
        {
            return AInstance.instancesCreated;
        }
        protected static setInstancesCreated(instancesCreated: number) : void
        {
            AInstance.instancesCreated = instancesCreated;
        }
        protected static incrementInstancesCreated() : void
        {
            AInstance.setInstancesCreated(AInstance.getInstancesCreated() + 1);
        }
        
        private instanceIndex: number;
        public getInstanceIndex() : number
        {
            return this.instanceIndex;
        }
        protected setInstanceIndex(instanceIndex: number) : void
        {
            this.instanceIndex = instanceIndex;
        }
        
        private typeInstanceIndex: number;
        public getTypeInstanceIndex() : number
        {
            return this.typeInstanceIndex;
        }
        protected setTypeInstanceIndex(typeInstanceIndex: number) : void
        {
            this.typeInstanceIndex = typeInstanceIndex;
        }
        
        private type: string;
        public getType() : string
        {
            return this.type;
        }
        protected setType(type: string) : void
        {
            this.type = type;
        }
            
        private id: string;
        public getId() : string
        { 
            return this.id; 
        }
        public setId(id: string) : void
        { 
            this.id = id; 
        }

        constructor()
        {
        }
        protected initInstance(type: string, typeInstanceIndex: number) : void
        {
            this.setType(type);
            this.setInstanceIndex(AInstance.getInstancesCreated());
            AInstance.incrementInstancesCreated();
            this.setTypeInstanceIndex(typeInstanceIndex);
            this.setId(this.getType() + this.getTypeInstanceIndex()); 
        }
    }
}

