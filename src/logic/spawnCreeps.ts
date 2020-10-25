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
  let upgraderCreeps: Creep[] = creeps.filter((creep) => creep.memory.role == 'upgrader');

  if (spawnEnergy > 200 && upgraderCreeps.length < 4) {
    let name = 'Upgrader' + Memory.creepCounters.upgraderCounter;
    let memory = {
      role: 'upgrader',
      upgraderMode: 'mine'
    }
    homeSpawn.spawnCreep([MOVE, CARRY, WORK], name, { memory })
    Memory.creepCounters.upgraderCounter = Memory.creepCounters.upgraderCounter + 1;
    return;
  }
  else if (spawnEnergy > 200 && harvesterCreeps.length < 4) {
    let name = 'Harvester' + Memory.creepCounters.harvesterCounter;
    homeSpawn.spawnCreep([MOVE,CARRY,WORK], name, {memory: {role: 'harvester'}})
    Memory.creepCounters.harvesterCounter = Memory.creepCounters.harvesterCounter + 1;
    return;
  }
};