import harvester from "./roles/harvester";
import upgrader from "./roles/upgrader";
import builder from "./roles/builder";
import spawnCreeps from "./logic/spawnCreeps";
import { checkMemoryProps, cleanMemory } from "./logic/memoryFunctions";

checkMemoryProps();
spawnCreeps();

for (let creepName in Game.creeps) {
  let creep = Game.creeps[creepName];

  if (creep.memory.role == "harvester") {
    harvester(creep);
  }
  else if (creep.memory.role == "upgrader") {
    upgrader(creep);
  }
  else if (creep.memory.role == "builder") {
    builder(creep);
  }
}

cleanMemory();