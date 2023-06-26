import { ObjectId } from 'mongodb'

export interface RaceResultType {
  _id: ObjectId
  no: number
  driver: {
    type: ObjectId
    ref: 'drivers'
  }
  car: string
  laps: number
  timeRetried: string
  pts: number
  fastest_laps: {
    lap: number
    time_of_day: string
    time: string
    avg_speed: number
  }
  pit_stop_summary: [
    {
      lap: number
      time_of_day: string
      time: string
      total: number
    }
  ]
  stating_grid: number
  qualifying: {
    Q1: number
    Q2: number
    Q3: number
    laps: number
  }
  practice3: {
    time: number
    gap: number
    laps: number
  }
  practice2: {
    time: number
    gap: number
    laps: number
  }
  practice1: {
    time: number
    gap: number
    laps: number
  }
  dateTime: Date
}

export default class RaceResult {
  _id?: ObjectId
  no: number
  driver: {
    type: ObjectId
    ref: 'drivers'
  }
  car: string
  laps: number
  timeRetried: string
  pts: number
  fastest_laps: {
    lap: number
    time_of_day: string
    time: string
    avg_speed: number
  }
  pit_stop_summary: [
    {
      lap: number
      time_of_day: string
      time: string
      total: number
    }
  ]
  stating_grid: number
  practice3: {
    time: number
    gap: number
    laps: number
  }
  practice2: {
    time: number
    gap: number
    laps: number
  }
  practice1: {
    time: number
    gap: number
    laps: number
  }
  dateTime: Date
  constructor(raceResult: RaceResultType) {
    this._id = raceResult._id
    this.no = raceResult.no
    this.driver = raceResult.driver
    this.laps = raceResult.laps
    this.timeRetried = raceResult.timeRetried
    this.pts = raceResult.pts
    this.fastest_laps = raceResult.fastest_laps
    this.pit_stop_summary = raceResult.pit_stop_summary
    this.stating_grid = raceResult.stating_grid
    this.practice3 = raceResult.practice3
    this.practice2 = raceResult.practice2
    this.practice1 = raceResult.practice1
    this.car = raceResult.car
    this.dateTime = raceResult.dateTime
  }
}
