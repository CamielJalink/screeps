export default function upgrader(creep: Creep) {
  let homeSpawn = Game.spawns['Home'];
  let sources: Source[] = homeSpawn.room.find(FIND_SOURCES);

  if(homeSpawn.room.controller){
    if (creep.memory.upgraderMode === "mine" && creep.store.getFreeCapacity("energy") === 0) {
      creep.memory.upgraderMode = "upgrade";
    }
    else if (creep.memory.upgraderMode === "upgrade" && creep.store.getUsedCapacity("energy") === 0) {
      creep.memory.upgraderMode = "mine";
    }


    if(creep.memory.upgraderMode === "upgrade"){
      if (creep.upgradeController(homeSpawn.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(homeSpawn.room.controller);
      }
    }
    else if(creep.memory.upgraderMode === "mine"){
      if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      };
    }
    else{
      console.log("no work for upgrader " + creep.name);
    }
  }
}