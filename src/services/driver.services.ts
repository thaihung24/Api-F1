import Driver, { driverType } from '~/models/schemas/Drivers.schemas'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import RaceResult, { RaceResultType } from '~/models/schemas/RaceResults.schemas'

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
  async getDriversInYear(year: number) {
    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $year: '$date_time' }, year] }
        }
      },

      {
        $addFields: {
          convertedQty: { $toDouble: '$pts' }
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
  async findStandingsByNameOfYear(year: number, name: string) {
    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $year: '$date_time' }, year] }
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
        $project: {
          _id: 0, // Exclude the _id field if desired
          'driver.driver': 1,
          car: 1,
          laps: 1,
          time_retired: 1,
          pts: 1,
          country: 1
        }
      }
    ]
    try {
      const result = await databaseService.race_results.aggregate<RaceResult>(pipeline).toArray()
      // return result
      // const rankedDrivers = result.map((result) => new RaceResult(result as any))
      const driversByCountry: Record<string, RaceResultType[] | any[]> = {} // Object to store drivers grouped by country
      result?.forEach((result: RaceResultType | any) => {
        if (driversByCountry[result.country]) {
          driversByCountry[result.country].push(result)
        } else {
          driversByCountry[result.country] = [result]
        }
      })

      for (const country in driversByCountry) {
        driversByCountry[country].sort((a, b) => b.pts - a.pts) // Sort drivers in descending order based on pts
        driversByCountry[country].forEach((driver, index) => {
          driver.race_position = index + 1 // Assign a sequential number to each driver
        })
      }
      const data = Object.values(driversByCountry)
        .flat()
        .filter((res) => res.driver[0].driver == name)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
const driverService = new DriverService()
export default driverService
