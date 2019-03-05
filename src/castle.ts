import {fetchChest, fetchRoom} from './fetch'
import {Chest} from './type/chest'
import {Id} from './type/id'

// Log stuff
let openingChestCount = 0
let openingRoomCount = 0
let openedChestCount = 0
let openedRoomCount = 0
setInterval(() => console.log(openingRoomCount, openedRoomCount, openingChestCount, openedChestCount), 4000)

const isChestEmpty = (chest: Chest) => chest.status === 'This chest is empty :/ Try another one!'

const openChest = async (url: string): Promise<Chest | undefined> => {
  try {
    openingChestCount++
    const chest = await fetchChest(url)
    openedChestCount++

    if (!isChestEmpty(chest)) {
      return chest
    }
  } catch {
    return undefined
  }
}

const openRoom = async (url: string): Promise<Chest[]> => {
  try {
    openingRoomCount++
    const room = await fetchRoom(url)
    openedRoomCount++

    const openRoomPromises = room.rooms.map(openRoom)
    const openChestPromises = room.chests.map(openChest)
    const rooms: Chest[][] = await Promise.all(openRoomPromises)
    const chests: Chest[] = await Promise.all(openChestPromises)
    return [
      ...chests.filter(x => !!x),
      ...rooms.reduce((x, y) => x.concat(y), [])
    ]
  } catch (e) {
    return []
  }
}

export const getChestsInCastle = async (): Promise<Id[]> => {
  const chests = await openRoom('/castles/1/rooms/entry')
  return chests.map(c => c.id)
}
