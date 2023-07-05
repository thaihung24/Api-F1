import { ObjectId } from 'mongodb'
export interface RaceType {
  _id?: ObjectId
  race_name: {
    key: string
    value: string
    text: string
  }[]

  country: string
  date_time: Date
}

export default class Races {
  _id?: ObjectId
  country: string
  race_name: { key: string; value: string; text: string }[]
  date_time: Date
  constructor(race: RaceType) {
    this._id = race._id
    this.country = race.country
    this.race_name = race.race_name
    this.date_time = race.date_time
  }
}
