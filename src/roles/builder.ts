export default function builder(creep: Creep) {
  let homeSpawn = Game.spawns['Home'];

  let containers: Structure[] = [];
  homeSpawn.room.find(FIND_STRUCTURES).forEach((structure) => {
    if (structure.structureType == "container") {
      containers.push(structure);
    };
  })

  let constructionSites: ConstructionSite[] = homeSpawn.room.find(FIND_MY_CONSTRUCTION_SITES);
  

  if (creep.store.getFreeCapacity() == 0) {
    creep.memory.builderMode = "build";
  }
  else if(creep.store.getUsedCapacity() == 0){
    creep.memory.builderMode = 'withdraw';
  }


  if(creep.memory.builderMode == "withdraw"){
    if(creep.withdraw(containers[0], "energy") == ERR_NOT_IN_RANGE){
      creep.moveTo(containers[0]);
    }
  }
  else if(creep.memory.builderMode == "build"){
    containers.forEach((container) => {
      if(container.hits < container.hitsMax){
        if (creep.repair(container) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        };
      }
    })
    if(creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE){
      creep.moveTo(constructionSites[0]);
    }
  }
  else if(constructionSites.length === 0 && creep.memory.builderMode === "build") {
    creep.moveTo(containers[0]);
  }
}


// Als ik helemaal leeg ben, ga ik energie halen. 
// Als ik energie heb:
//  Als er iets te repareren valt, ga dat repareren. 
//  Als er iets te bouwen valt, ga dat bouwen. 
//  Als 