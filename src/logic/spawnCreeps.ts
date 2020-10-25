export default function spawnCreeps(){
  let homeSpawn = Game.spawns['Home'];
  
  if(homeSpawn.spawning == null){
    checkIfShouldSpawn(homeSpawn);
  }
}


function checkIfShouldSpawn(homeSpawn: StructureSpawn){

  let spawnEnergy = homeSpawn.store.getUsedCapacity("energy");
  let creeps: Creep[] = homeSpawn.room.find(FIND_MY_CREEPS);

  let harvesterCreeps: Creep[] = creeps.filter((creep) => creep.memory.role == 'harvester');

  if (spawnEnergy > 200 && harvesterCreeps.length < 4) {
    let name = 'Harvester' + Memory.creepCounters.harvesterCounter;
    homeSpawn.spawnCreep([MOVE,CARRY,WORK], name, {memory: {role: 'harvester'}})
    Memory.creepCounters.harvesterCounter = Memory.creepCounters.harvesterCounter + 1;
    return;
  }
};