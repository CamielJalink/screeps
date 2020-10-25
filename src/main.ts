import harvester from "./roles/harvester";
import upgrader from "./roles/upgrader";
import spawnCreeps from "./logic/spawnCreeps";

spawnCreeps();

// Main gameloop
for(creepName in Game.creeps){
  let creep = Game.creeps[creepName];

  if(creep.memory.role == "harvester"){
    harvester(creep);
  }
  else if(creep.memory.role == "upgrader"){
    upgrader(creep);
  }
}



for (var creepName in Memory.creeps) {
  if (!Game.creeps[creepName]) {
    delete Memory.creeps[creepName];
  }
}