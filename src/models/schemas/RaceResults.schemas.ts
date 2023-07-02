import { ObjectId } from 'mongodb'

export interface RaceResultType {
  _id: ObjectId
  no: number
  driver: {
    type: ObjectId
    ref: 'drivers'
  }
  car: string
  laps: number | string
  time_retired: string
  pts: number
  fastest_laps: {
    lap: number
    time_of_day: string
    time: string
    avg_speed: number
  }
  sprint: {
    laps: number | string
    time_retried: string
    pts: string | number
  }
  sprint_grid: {
    time: string | number
  }
  sprint_shootout: {
    q1: string
    q2: string
    q3: string
    laps: number | string
  }
  pit_stop_summary: [
    {
      lap: number
      time_of_day: string
      time: string
      total: string
    }
  ]

  starting_grid: {
    pos: number
    time: string
  }

  qualifying: {
    q1: string
    q2: string
    q3: string
    laps: number
  }
  qualifying_0: any
  qualifying_1: any
  qualifying_2: any
  practice_4: any
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
  practice_0: {
    time: number
    gap: number
    laps: number
  }
  country: string
  date_time: Date
}

export default class RaceResult {
  _id?: ObjectId
  no: number
  driver: {
    type: ObjectId
    ref: 'drivers'
  }
  car: string
  laps: number | string
  time_retired: string
  pts: number
  fastest_laps?: {
    lap: number
    time_of_day: string
    time: string
    avg_speed: number
  }
  sprint?: {
    laps: number | string
    time_retried: string
    pts: string | number
  }
  sprint_grid?: {
    time: string | number
  }
  sprint_shootout?: {
    q1: string
    q2: string
    q3: string
    laps: number | string
  }
  pit_stop_summary?: [
    {
      lap: number
      time_of_day: string
      time: string
      total: string
    }
  ]
  starting_grid?: {
    pos: number
    time: string
  } | null
  qualifying?: {
    q1: string
    q2: string
    q3: string
    laps: number
  }
  qualifying_0: any
  qualifying_1: any
  qualifying_2: any
  practice_4?: any
  practice_3?: {
    time: {
      hour: number
      second: number
    }
    gap: number
    laps: number
  }
  practice_2?: {
    time: number
    gap: number
    laps: number
  }
  practice_1?: {
    time: number
    gap: number
    laps: number
  }
  practice_0?: {
    time: number
    gap: number
    laps: number
  }
  country: string
  date_time: Date
  constructor(raceResult: RaceResultType) {
    this._id = raceResult._id
    this.no = raceResult.no
    this.driver = raceResult.driver
    this.laps = raceResult.laps
    this.time_retired = raceResult.time_retired
    this.pts = raceResult.pts
    this.sprint = raceResult.sprint
    this.sprint_grid = raceResult.sprint_grid
    this.sprint_shootout = raceResult.sprint_shootout
    this.fastest_laps = raceResult.fastest_laps
    this.pit_stop_summary = raceResult.pit_stop_summary
    this.starting_grid = raceResult.starting_grid
    this.qualifying = raceResult.qualifying
    this.qualifying_0 = raceResult.qualifying_0
    this.qualifying_1 = raceResult.qualifying_1
    this.qualifying_2 = raceResult.qualifying_2
    this.practice_4 = raceResult.practice_4
    this.practice_3 = raceResult.practice_3
    this.practice_2 = raceResult.practice_2
    this.practice_1 = raceResult.practice_1
    this.practice_0 = raceResult.practice_0
    this.car = raceResult.car
    this.country = raceResult.country
    this.date_time = raceResult.date_time
  }
}
