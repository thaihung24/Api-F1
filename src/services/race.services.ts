import Races, { RaceType } from '~/models/schemas/Races.schemas'
import databaseService from './database.services'

import { ObjectId } from 'mongodb'

class RaceService {
  async createRace(payload: RaceType) {
    const result = await databaseService.races.insertOne(new Races(payload))
    return result
  }
  //Tìm danh sách các giải đua phụ có mặt theo năm ở một nước.
  // ví dụ ở vào năm 2023 ở BAHRAIN có các giải phụ như FASTEST LAPS, STARTING GRID
  async findNameRacesOfYearByCountry(year: number, country: string) {
    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $year: '$date_time' }, year] },
          country: country
        }
      }
    ]
    const result = await databaseService.races.aggregate<Races>(pipeline).toArray()
    return result
  }
}
const raceService = new RaceService()
export default raceService
