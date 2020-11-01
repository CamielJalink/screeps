export default function builder(creep: Creep) {
  let homeSpawn = Game.spawns['Home'];
  let sources: Source[] = homeSpawn.room.find(FIND_SOURCES);
  let constructionSites: ConstructionSite[] = homeSpawn.room.find(FIND_MY_CONSTRUCTION_SITES);
  
  if (creep.store.getFreeCapacity() == 0) {
    creep.memory.builderMode = "build";
  }
  else if(creep.store.getUsedCapacity() == 0){
    creep.memory.builderMode = 'withdraw';
  }

  if(creep.memory.builderMode == "withdraw"){
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
      creep.moveTo(sources[0]);
    }
  }
  else if(creep.memory.builderMode == "build"){
    if(creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE){
      creep.moveTo(constructionSites[0]);
    }
  }

  // creep.store.getFreeCapacity()
  // creep.moveTo
  // creep.transfer
  // Room.createConstructionSite
  // Creep.build
  // creep.x.withdraw

}

// v2: Als er iets te repairen is, ga repairen.
// Als er iets te bouwen is, ga bouwen.
// Als je geen energy meer hebt, ga energy halen uit een depot.