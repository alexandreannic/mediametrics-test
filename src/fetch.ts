import axios from 'axios'
import {Room} from './type/room'
import {Chest} from './type/chest'

const baseUrl = 'http://castles.poulpi.fr'

const fetch = <T>(path: string): Promise<T | null> =>
  axios.get(baseUrl + path)
    .then(response => response.data)
    .catch(error => {
      console.error('Error on', path)
      return Promise.reject()
    })

export const fetchRoom = (path: string) => fetch<Room>(path)

export const fetchChest = (path: string) => fetch<Chest>(path)


