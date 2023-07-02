import Driver, { driverType } from '~/models/schemas/Drivers.schemas'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import RaceResult from '~/models/schemas/RaceResults.schemas'

class DriverService {
  async find(payload: string) {
    const result = await databaseService.drivers.findOne({ driver: payload })
    return result
  }
  async findById(payload: string) {
    const result = await databaseService.drivers.findOne({ _id: new ObjectId(payload) })
    return result
  }
  async create(payload: driverType) {
    const result = await databaseService.drivers.insertOne(new Driver(payload))
    return result
  }
  async update(payload: driverType) {
    console.log(payload._id?.toString())
    const result = databaseService.drivers.updateOne(
      { _id: new ObjectId(payload._id?.toString()) },
      { $set: { driver: payload.driver, country: payload.country, team: payload.team } }
    )
    return result
  }
  async getDriverInYear(payload: string) {
    const pipeline = [
      {
        $match: {
          date_time: {
            $gte: new Date('2023-01-01'),
            $lt: new Date('2024-01-01')
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
          _id: '$driver',
          totalPoints: { $sum: '$convertedQty' }
        }
      },
      {
        $lookup: {
          from: 'drivers',
          localField: '_id',
          foreignField: '_id',
          as: 'drivers'
        }
      },
      {
        $sort: {
          totalPoints: -1
        }
      },
      {
        $project: {
          'drivers.driver': 1,
          'drivers.country': 1,
          driver: 1,
          totalPoints: 1
        }
      }
    ]
    const drivers = await databaseService.race_results.aggregate<RaceResult>(pipeline).toArray()
    return drivers
  }
}
const driverService = new DriverService()
export default driverService
