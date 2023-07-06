import redis, { RedisClient } from 'redis'
import raceService from './race.services'
interface Config {
  host: string
  port: number
}
class RaceServiceCache {
  private _client: RedisClient
  constructor() {
    const config: Config = {
      host: process.env.REDIS_HOST || process.env.IP || '127.0.0.1',
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
    }
    this._client = redis.createClient(config)
  }
  async findNameRacesOfYearByCountryCache(year: number, country: string) {
    const key = `findNameRacesOfYearByCountry-${country}-${year}`
    const client = this._client
    return new Promise((resolve, reject) => {
      client.get(key, async (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        if (reply === null) {
          console.log(`Cache miss ${key}`)
          const result = await raceService.findNameRacesOfYearByCountry(Number(year), country)
          client.set(key, JSON.stringify(result))
          client.expire(key, 900, (err, reply) => {
            if (err) {
              console.log(err)
              return
            }
            if (reply === 1) {
              console.log(`Expiration time has been set for the key ${key}`)
            } else {
              console.log('Key does not exist or could not set expiration time')
            }
          })
          resolve(result)
        } else {
          console.log('Cache hit ' + key)
          resolve(JSON.parse(reply))
        }
      })
    })
  }
}
const raceServiceCache = new RaceServiceCache()
export default raceServiceCache
