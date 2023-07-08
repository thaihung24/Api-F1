'use strict'
import Redis from 'ioredis'

class CacheService {
  private _client: Redis
  constructor() {
    this._client = new Redis(process.env.REDIS_URL ? process.env.REDIS_URL : '127.0.0.1')
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getCacheByKey(key: string, boundFunction: Function) {
    const client = this._client
    return client.get(key).then(async (res) => {
      if (res !== null) {
        console.log('Cache hit ' + key)
        return JSON.parse(res)
      } else {
        console.log('Cache miss: ' + key)
        const result = await boundFunction()
        client.set(key, JSON.stringify(result))
        client.expire(key, 900)
        return result
      }
    })
  }
}

const cacheService = new CacheService()
export default cacheService
