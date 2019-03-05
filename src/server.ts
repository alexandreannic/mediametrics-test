import {getChestsInCastle} from './castle'

console.log('Start...')

getChestsInCastle().then(c => console.log(`Result: ${c.length} chests: `, c))
