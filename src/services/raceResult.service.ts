import RaceResult, { RaceResultType } from '~/models/schemas/RaceResults.schemas'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class RaceResultService {
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
      const result = databaseService.race_results
        .find({
          driver: new ObjectId(payload) as any,
          dateTime: { $gte: new Date('2016-01-01T00:00:00.000Z'), $lt: new Date('2017-01-01T00:00:00.000Z') }
          // stating_grid: { $ne: null }
        })
        .toArray()
      return result

      // return result
    } catch (error) {
      console.error('Error finding driver by ID:', error)
      throw error
    }
  }
}
const raceResultService = new RaceResultService()
export default raceResultService
