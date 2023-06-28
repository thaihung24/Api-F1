import Driver, { driverType } from '~/models/schemas/Drivers.schemas'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

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
}
const driverService = new DriverService()
export default driverService
