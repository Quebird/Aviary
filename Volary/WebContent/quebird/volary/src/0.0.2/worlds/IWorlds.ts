module Volary {

    /**
     * World container specification.
     */
    export interface IWorlds extends IInstance {
        
        volary : IVolary;
        worlds : Array<IWorld>;
        
        getWorldByInstanceId(id : string) : IWorld;
        
        createWorld(x : number, y : number, z : number, width : number, height : number, depth : number) : IWorld;
        deleteWorld(world : IWorld) : void;
    }

}