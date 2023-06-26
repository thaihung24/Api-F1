import { ObjectId } from 'mongodb'

interface teamType {
  _id?: ObjectId
  car: string
}
export default class Team {
  _id?: ObjectId
  car: string
  constructor(team: teamType) {
    this._id = team._id
    this.car = team.car || ''
  }
}
