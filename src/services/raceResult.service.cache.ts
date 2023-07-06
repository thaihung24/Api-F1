import redis, { RedisClient } from 'redis'
import raceResultService from './raceResult.service'
import { resolve } from 'path'

interface Config {
  host: string
  port: number
}
class RaceResultServiceCache {
  private _client: RedisClient
  constructor() {
    const config: Config = {
      host: process.env.REDIS_HOST || process.env.IP || '127.0.0.1',
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
    }
    this._client = redis.createClient(config)
  }
  // tìm bảng xếp hạng của các team tham gia theo năm
  async findStandingOfTeamsByYearCache(year: number) {
    const key = `findStandingOfTeamsByYearCache-${year}`
    const client = this._client
    return new Promise((resolve, reject) => {
      client.get(key, async (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        if (reply === null) {
          console.log(`Cache miss ${key}`)
          const result = await raceResultService.findStandingOfTeamsByYear(Number(year))
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
          console.log(`Cache hit ${key}`)
          resolve(JSON.parse(reply))
        }
      })
    })
  }
  //Tìm kết quả chung cuộc của giải đua theo năm ở các nước.
  async findRaceResultsOfYearCache(year: number) {
    const key = `findRaceResultsOfYearCache-${year}`
    const client = this._client
    return new Promise((resolve, reject) => {
      client.get(key, async (err, reply) => {
        if (err) {
          console.log(err)
          return
        }
        if (reply === null) {
          console.log(`Cache miss ${key}`)
          const result = await raceResultService.findRaceResultsOfYear(Number(year))
          client.set(key, JSON.stringify(result))
          client.expire(key, 900, (err, reply) => {
            if (err) {
              console.log(err)
              return
            }
            if (reply === 1) {
              console.log('Expiration time has been set for the key')
            } else {
              console.log('Key does not exist or could not set expiration time')
            }
          })
          resolve(result)
        } else {
          console.log(`Cache hit ${key}`)
          resolve(JSON.parse(reply))
        }
      })
    })
  }

  //Tìm kết quả chung cuộc của giải đua theo năm ở một nước.
  async findRaceResultsOfYearByCountry(year: number, country: string) {
    const key = `findRaceResultsOfYearByCountry-${country}-${year}`
    const client = this._client
    return new Promise((resolve, reject) => {
      client.get(key, async (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        if (reply === null) {
          console.log(`Cache miss ${key}`)
          const result = await raceResultService.findRaceResultsOfYearByCountry(Number(year), country)
          client.set(key, JSON.stringify(result))
          client.expire(key, 900, (err, reply) => {
            if (err) {
              console.error(err)
              return
            }
            if (reply === 1) {
              console.log('Expiration time has been set for the key')
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
