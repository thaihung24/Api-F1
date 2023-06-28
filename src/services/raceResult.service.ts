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
        .find({ driver: new ObjectId(payload) as any, dateTime: '05 Mar 2023' as any })
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
