import RaceResult, { RaceResultType } from '~/models/schemas/RaceResults.schemas'
import redis, { RedisClient } from 'redis'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
interface Config {
  host: string
  port: number
}

class RaceResultService {
  private _client: RedisClient
  constructor() {
    const config: Config = {
      host: process.env.REDIS_HOST || process.env.IP || '127.0.0.1',
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
    }
    this._client = redis.createClient(config)
  }
  async find(payload: string) {
    const result = await databaseService.race_results.find({ payload })
    return result
  }
  async create(payload: RaceResultType) {
    const result = await databaseService.race_results.insertOne(new RaceResult(payload))
    return result
  }
  async findByDriverId(payload: string) {
    try {
      const key = `findDriverById-${payload}`
      const client = this._client
      return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
          if (err) {
            reject(err)
            return
          }
          if (reply === null) {
            console.log('Cache miss: ' + key)
            const result = databaseService.race_results
              .find({
                driver: new ObjectId(payload) as any
                // stating_grid: { $ne: null }
              })
              .toArray()
            client.set(key, JSON.stringify(result))
            resolve(result)
          } else {
            console.log('Cache hit: ' + key)
            resolve(JSON.parse(reply))
          }
        })
      })
    } catch (error) {
      console.error('Error finding driver by ID:', error)
      throw error
    }
  }

  // tìm bảng xếp hạng của các team theo năm
  async findStandingOfTeamsByYear(year: number) {
    const key = `findStandingOfTeamsByYear-${year}`
    const client = this._client
    return new Promise((resolve, reject) => {
      client.get(key, async (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        if (reply === null) {
          console.log('Cache miss: ' + key)
          const pipeline = [
            {
              $match: {
                date_time: {
                  $gte: new Date(`${year}-01-01`),
                  $lt: new Date(`${year + 1}-01-01'`)
                }
              }
            },
            {
              $addFields: {
                convertedQty: { $toInt: '$pts' }
              }
            },
            {
              $group: {
                _id: '$car',
                totalPoints: { $sum: '$convertedQty' }
              }
            },
            {
              $sort: {
                totalPoints: -1
              }
            }
          ]
          const result = await databaseService.race_results.aggregate<RaceResult>(pipeline).toArray()
          client.set(key, JSON.stringify(result))
          resolve(result)
        } else {
          console.log('Cache hit: ' + key)
          resolve(JSON.parse(reply))
        }
      })
    })
  }

  //Tìm kết quả chung cuộc của giải đua theo năm ở các nước.
  async findRaceResultsOfYear(year: number) {
    // eslint-disable-next-line no-useless-catch
    try {
      const pipeline = [
        {
          $match: {
            $expr: { $eq: [{ $year: '$date_time' }, year] }
          }
        },
        {
          $addFields: {
            convertedPTS: { $toInt: '$pts' }
          }
        },
        {
          $group: {
            _id: '$country', // Group by country
            maxPst: { $max: '$convertedPTS' }, // Calculate the maximum points (pst)
            driver: { $first: '$$ROOT' }
          }
        },
        {
          $project: {
            _id: 0,
            country: '$_id',
            date: '$driver.date_time',
            winner: '$driver.driver',
            car: '$driver.car',
            laps: '$driver.laps',
            time: '$driver.time_retired'
          }
        },
        {
          $lookup: {
            from: 'drivers',
            localField: 'winner',
            foreignField: '_id',
            as: 'driver'
          }
        },
        {
          $sort: {
            date: 1
          }
        },
        {
          $project: {
            _id: 0,
            country: 1,
            date: 1,
            winner: '$driver.driver',
            car: 1,
            laps: 1,
            time: 1
          }
        }
      ]
      const result = await databaseService.race_results.aggregate<RaceResult>(pipeline).toArray()
      return result
    } catch (error) {
      throw error
    }
  }
  //Tìm kết quả chung cuộc của giải đua theo năm ở một nước.
  async findRaceResultsOfYearByCountry(year: number, country: string) {
    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $year: '$date_time' }, year] },
          country: country
        }
      },
      {
        $addFields: {
          convertedPTS: { $toInt: '$pts' }
        }
      },
      {
        $lookup: {
          from: 'drivers',
          localField: 'driver',
          foreignField: '_id',
          as: 'driver'
        }
      },
      {
        $sort: {
          convertedPTS: -1
        }
      },
      {
        $project: {
          _id: 0,
          no: 1,
          driver: '$driver.driver',
          car: 1,
          laps: 1,
          time_retired: 1,
          pts: '$convertedPTS'
        }
      }
    ]
    const result = await databaseService.race_results.aggregate<RaceResult>(pipeline).toArray()

    return result
  }

  //Tìm kết quả của từng giải phụ theo năm ở một nước.
  // ví dụ ở vào năm 2023 ở BAHRAIN có các giải phụ như FASTEST LAPS, STARTING GRID
  async findRaceResultByNameOfYearByCountry(year: number, country: string, race: string) {
    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $year: '$date_time' }, year] },
          country: country
        }
      },
      {
        $sort: {
          [`${race}.pos`]: 1
        }
      },
      {
        $project: {
          [`${race}`]: 1
        }
      }
    ]
    const result = await databaseService.race_results.aggregate<RaceResult>(pipeline).toArray()
    return result
  }
}

const raceResultService = new RaceResultService()
export default raceResultService
