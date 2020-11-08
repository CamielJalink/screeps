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


  const creepEmpty: boolean = (creep.store.getUsedCapacity("energy") === 0);
  const creepFull: boolean = (creep.store.getFreeCapacity("energy") === 0);
  const fillTargets: boolean = (fillableStructures.length > 0);


  if (creepEmpty){
    creep.memory.harvesterMode = "mine";
  }
  else if (!creepFull && creep.memory.harvesterMode === "mine"){
    creep.memory.harvesterMode = "mine";
  }
  else if (!creepFull && !fillTargets){
    creep.memory.harvesterMode = "mine";
  }
  else if (creepFull && fillTargets){
    creep.memory.harvesterMode = "deliver";
  }
  else if (!creepFull && fillTargets && creep.memory.harvesterMode ==="deliver"){
    creep.memory.harvesterMode = "deliver";
  }
  else if (creepFull && !fillTargets){
    creep.memory.harvesterMode = "idle";
  }


  if (creep.memory.harvesterMode === "mine") {
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
      creep.moveTo(sources[0]);
    };
  }
  else if (creep.memory.harvesterMode === "deliver"){
    if (creep.transfer(fillableStructures[0], "energy") === ERR_NOT_IN_RANGE) {
      creep.moveTo(fillableStructures[0]);
    }
  }
  else if (creep.memory.harvesterMode === "idle") {
    creep.moveTo(homeSpawn); // Don't stand around the mining node please!
  }
}