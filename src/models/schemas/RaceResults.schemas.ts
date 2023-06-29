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
  practice_3: {
    time: {
      hour: number
      second: number
    }
    gap: number
    laps: number
  }
  practice_2: {
    time: number
    gap: number
    laps: number
  }
  practice_1: {
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
  stating_grid?: {
    pos: number
    time: string
  } | null
  practice_3: {
    time: {
      hour: number
      second: number
    }
    gap: number
    laps: number
  }
  practice_2: {
    time: number
    gap: number
    laps: number
  }
  practice_1: {
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
    this.practice_3 = raceResult.practice_3
    this.practice_2 = raceResult.practice_2
    this.practice_1 = raceResult.practice_1
    this.car = raceResult.car
    this.country = raceResult.country
    this.dateTime = raceResult.dateTime
  }
}
