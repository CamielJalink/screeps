export default function spawnCreeps(){
  let homeSpawn = Game.spawns['Home'];
  
  if(homeSpawn.spawning == null){
    checkIfShouldSpawn(homeSpawn);
  }
}

function checkIfShouldSpawn(homeSpawn: StructureSpawn){

  let extensionEnergy: number = 0;
  homeSpawn.room.find(FIND_MY_STRUCTURES).forEach((structure) =>{
    if(structure.structureType == "extension"){
      extensionEnergy += structure.store.getUsedCapacity("energy");
    }
  })
  let spawnEnergy = extensionEnergy + homeSpawn.store.getUsedCapacity("energy");

  let creeps: Creep[] = homeSpawn.room.find(FIND_MY_CREEPS);
  let harvesterCreeps: Creep[] = creeps.filter((creep) => creep.memory.role == 'harvester');
  let upgraderCreeps: Creep[] = creeps.filter((creep) => creep.memory.role == 'upgrader');
  let builderCreeps: Creep[] = creeps.filter((creep) => creep.memory.role == 'builder');

  if (spawnEnergy >= 200 && harvesterCreeps.length < 8) {
    let name = 'Harvester' + Memory.creepCounters.harvesterCounter;
    let memory = {
      role: 'harvester',
      harvesterMode: 'mine'
    }
    homeSpawn.spawnCreep([MOVE, CARRY, WORK], name, { memory })
    Memory.creepCounters.harvesterCounter = Memory.creepCounters.harvesterCounter + 1;
    return;
  }

  else if (spawnEnergy >= 200 && upgraderCreeps.length < 4) {
    let name = 'Upgrader' + Memory.creepCounters.upgraderCounter;
    let memory = {
      role: 'upgrader',
      upgraderMode: 'mine'
    }
    homeSpawn.spawnCreep([MOVE, CARRY, WORK], name, { memory })
    Memory.creepCounters.upgraderCounter = Memory.creepCounters.upgraderCounter + 1;
    return;
  }

  else if (spawnEnergy >= 200 && builderCreeps.length < 4){
    let name = 'Builder' + Memory.creepCounters.builderCounter;
    let memory = {
      role: 'builder',
      builderMode: 'withdraw',
      // Nog iets van een veld dat hij nu aan het builden is?
    }
    homeSpawn.spawnCreep([MOVE, CARRY, WORK], name, { memory })
    Memory.creepCounters.builderCounter = Memory.creepCounters.builderCounter + 1;
  }
};