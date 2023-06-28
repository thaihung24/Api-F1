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
  fastest_lap: {
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
      total: string
    }
  ]
  stating_grid: {
    pos: number
    time: string
  }
  qualifying: {
    Q1: string
    Q2: string
    Q3: string
    laps: number
  }
  practice3: {
    time: {
      hour: number
      second: number
    }
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
  country: string
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
  fastest_lap: {
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
      total: string
    }
  ]
  stating_grid: {
    pos: number
    time: string
  }
  practice3: {
    time: {
      hour: number
      second: number
    }
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
  country: string
  dateTime: Date
  constructor(raceResult: RaceResultType) {
    this._id = raceResult._id
    this.no = raceResult.no
    this.driver = raceResult.driver
    this.laps = raceResult.laps
    this.timeRetried = raceResult.timeRetried
    this.pts = raceResult.pts
    this.fastest_lap = raceResult.fastest_lap
    this.pit_stop_summary = raceResult.pit_stop_summary
    this.stating_grid = raceResult.stating_grid
    this.practice3 = raceResult.practice3
    this.practice2 = raceResult.practice2
    this.practice1 = raceResult.practice1
    this.car = raceResult.car
    this.country = raceResult.country
    this.dateTime = raceResult.dateTime
  }
}
