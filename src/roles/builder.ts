export default function builder(creep: Creep) {
  let homeSpawn = Game.spawns['Home'];
  let constructionSites: ConstructionSite[] = homeSpawn.room.find(FIND_MY_CONSTRUCTION_SITES);

  // Containers to get store energy from
  let containers: Structure[] = [];
  homeSpawn.room.find(FIND_STRUCTURES).forEach((structure) => {
    if (structure.structureType == "container") {
      containers.push(structure);
    };
  })

  let damagedStructures: Structure[] = [];
  homeSpawn.room.find(FIND_STRUCTURES).forEach((structure) => {
    if (structure.hits < structure.hitsMax){
      damagedStructures.push(structure);
    };
  });


// If creep has no energy, get some
  if(creep.store.getUsedCapacity("energy") === 0){
    creep.memory.builderMode = "withdraw";
  }
// If creep has energy and something is damaged, go repair it
  else if(damagedStructures.length > 0){
    creep.memory.builderMode = "repair";
  }
// If creep has energy, nothing is damaged and there is a construction site, go build!
  else if(constructionSites.length > 0){
    creep.memory.builderMode = "build";
  }
// If we have energy and nothing needs doing, lets idle somewhere out of way
  else{
    creep.memory.builderMode = "idle";
  }

  
  if(creep.memory.builderMode === "withdraw"){
    if(creep.withdraw(containers[0], "energy") === ERR_NOT_IN_RANGE){
      creep.moveTo(containers[0]);
    }
  }
  else if (creep.memory.builderMode === "repair") {
    if (creep.repair(damagedStructures[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(damagedStructures[0]);
    }
  }
  else if(creep.memory.builderMode === "build"){
    if(creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE){
      creep.moveTo(constructionSites[0]);
    }
  }
  else if(creep.memory.builderMode === "idle"){
    if (creep.withdraw(containers[0], "energy") === ERR_NOT_IN_RANGE) {
      creep.moveTo(containers[0]);
    }
  };
}