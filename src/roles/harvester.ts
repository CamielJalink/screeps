export default function harvester(creep: Creep) {
  const homeSpawn = Game.spawns['Home'];
  const sources: Source[] = homeSpawn.room.find(FIND_SOURCES);
  let fillableStructures: Structure[] = [];

  homeSpawn.room.find(FIND_MY_STRUCTURES).forEach((structure) => {
    if((structure.structureType === "spawn" || structure.structureType === "extension") && structure.store.getFreeCapacity() !== 0){
      fillableStructures.push(structure);
    }
  });

  console.log(fillableStructures);

  if(creep.store.getFreeCapacity() != 0){
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    };
  } else{
    if (creep.transfer(fillableStructures[0], "energy") == ERR_NOT_IN_RANGE){
      creep.moveTo(fillableStructures[0]);
    }
  }
}