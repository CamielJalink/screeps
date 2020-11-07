export default function harvester(creep: Creep) {
  const homeSpawn = Game.spawns['Home'];
  const sources: Source[] = homeSpawn.room.find(FIND_SOURCES);
  let fillableStructures: Structure[] = [];


  homeSpawn.room.find(FIND_MY_STRUCTURES).forEach((structure) => {
    if((structure.structureType === "spawn" || structure.structureType === "extension") && structure.store.getFreeCapacity("energy") !== 0){
      fillableStructures.push(structure);
    }
  });
  homeSpawn.room.find(FIND_STRUCTURES).forEach((structure) => {
    if(structure.structureType === "container" && structure.store.getFreeCapacity("energy") !== 0){
      fillableStructures.push(structure);
    }
  })


  if (creep.memory.harvesterMode === "mine" && creep.store.getFreeCapacity("energy") === 0) {
    creep.memory.harvesterMode = "deliver";
  }
  else if(creep.memory.harvesterMode === "deliver" && creep.store.getUsedCapacity("energy") === 0){
    creep.memory.harvesterMode = "mine";
  }


// Als in mine mode. Ga minen.
  if (creep.memory.harvesterMode === "mine") {
    if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
      creep.moveTo(sources[0]);
    };
  }
  else if (creep.memory.harvesterMode === "deliver" && fillableStructures.length > 0){ // Is there anything to fill? 
    if (creep.transfer(fillableStructures[0], "energy") === ERR_NOT_IN_RANGE) { // Then fill it
      creep.moveTo(fillableStructures[0]); // Or move towards it
    }
  }
  else{
    creep.moveTo(homeSpawn); // Don't stand around the mining node please!
  }
}