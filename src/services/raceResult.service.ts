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

  // tìm bảng xếp hạng của các team theo năm
  async findStandingOfTeamsByYear(year: number) {
    try {
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
      return result
    } catch (error) {
      console.error('Error finding driver by ID:', error)
      throw error
    }
  }

  //Tìm kết quả của giải đua theo năm ở các nước.
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
}
const raceResultService = new RaceResultService()
export default raceResultService
