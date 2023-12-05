export default interface Maze {
    size: { width: number, height: number },
    map: number[][]
    initialPosition: [number, number],
    initialDirection: number,
    /*exitLocation: {
      type: 'elevator'|'passageway',
      name: string,
      coordinates: number[]
    }[]
    divisionDoor: {
      name: string,
      coordinates: number[]
    }[]*/
    };