module Volary
{
    /**
     * Abstract implementation of generic base object.
     */
    export abstract class AInstance implements IInstance
    {
        private static instancesCreated: number = 0;
        protected static getInstancesCreated()
        {
            return AInstance.instancesCreated;
        }
        protected static setInstancesCreated(instancesCreated: number)
        {
            AInstance.instancesCreated = instancesCreated;
        }
        protected static incrementInstancesCreated()
        {
            AInstance.setInstancesCreated(AInstance.getInstancesCreated() + 1);
        }
        
        private instanceIndex: number;
        public getInstanceIndex()
        {
            return this.instanceIndex;
        }
        protected setInstanceIndex(instanceIndex: number)
        {
            this.instanceIndex = instanceIndex;
        }
        
        private typeInstanceIndex: number;
        public getTypeInstanceIndex()
        {
            return this.typeInstanceIndex;
        }
        protected setTypeInstanceIndex(typeInstanceIndex: number)
        {
            this.typeInstanceIndex = typeInstanceIndex;
        }
        
        private type: string;
        public getType()
        {
            return this.type;
        }
        protected setType(type: string)
        {
            this.type = type;
        }
            
        private id: string;
        public getId() { return this.id; }
        public setId(id: string) { this.id = id; }

        constructor()
        {
        }
        protected initInstance(type: string, typeInstanceIndex: number)
        {
            this.setType(type);
            this.setInstanceIndex(AInstance.getInstancesCreated());
            AInstance.incrementInstancesCreated();
            this.setTypeInstanceIndex(typeInstanceIndex);
            this.setId(this.getType() + this.getTypeInstanceIndex()); 
        }
    }
}

