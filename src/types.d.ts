interface FlagMemory { [name: string]: any }
interface SpawnMemory { [name: string]: any }
interface CreepMemory { [name: string]: any }
interface RoomMemory { [name: string]: any }

interface Memory {
  creepCounters: {
    harvesterCounter: number,
    upgraderCounter: number,
    builderCounter: number,
  },
  [name: string]: any 
}