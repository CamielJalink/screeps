export default function harvester(creep: Creep) {
  let homeSpawn = Game.spawns['Home'];
  let sources: Source[] = homeSpawn.room.find(FIND_SOURCES);

  if(creep.store.getFreeCapacity() != 0){
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    };
  } else{
    if (creep.transfer(homeSpawn, "energy") == ERR_NOT_IN_RANGE){
      creep.moveTo(homeSpawn);
    }
  }
}