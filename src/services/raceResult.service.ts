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
}
const raceResultService = new RaceResultService()
export default raceResultService
