import harvester from "./roles/harvester";
import spawnCreeps from "./logic/spawnCreeps";

spawnCreeps();

// Main gameloop
for(creepName in Game.creeps){
  let creep = Game.creeps[creepName];

  if(creep.memory.role == "harvester"){
    harvester(creep);
  }
}



for (var creepName in Memory.creeps) {
  if (!Game.creeps[creepName]) {
    delete Memory.creeps[creepName];
  }
}