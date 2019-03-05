import {getChestsInCastle} from './castle'

console.log('Starting...')

getChestsInCastle().then(c => console.log(`Result: ${c.length} chests: `, c))
