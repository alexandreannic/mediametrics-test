import {Id} from './id'

export interface Room {
  id: Id
  rooms: [string]
  chests: [string]
}
