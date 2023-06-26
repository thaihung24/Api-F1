import { ObjectId } from 'mongodb'

export interface driverType {
  _id?: ObjectId
  driver: string
  country: string
  team: [
    {
      car: string
      date: Date
    }
  ]
}
export default class Driver {
  _id?: ObjectId
  driver: string
  country: string
  team: [
    {
      car: string
      date: Date
    }
  ]
  constructor(driver: driverType) {
    this._id = driver._id
    this.driver = driver.driver
    this.country = driver.country
    this.team = driver.team
  }
}
