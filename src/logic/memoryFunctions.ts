enum memoryNames {
  harvesterCounter = "harvesterCounter",
  upgraderCounter = "upgraderCounter",
  builderCounter = "builderCounter",
};

export function checkMemoryProps(){
  let memoryProps: memoryNames[] = [memoryNames.harvesterCounter, memoryNames.upgraderCounter, memoryNames.builderCounter];

  memoryProps.forEach((prop) => {
    if(!Memory.creepCounters[prop]){
      Memory.creepCounters[prop] = 0;
    };
  })
}

export function cleanMemory(){
  for (var creepName in Memory.creeps) {
    if (!Game.creeps[creepName]) {
      delete Memory.creeps[creepName];
    }
  }
}