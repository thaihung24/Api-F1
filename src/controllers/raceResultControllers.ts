import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import raceResultService from '~/services/raceResult.service'
import cacheService from '~/services/cache.services'
dotenv.config()
// tìm thành tích chung cuộc của cac team theo năm
export const getStandingsOfTeamsByYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = req.params.year || 2023
    if (process.env.Redis === 'true') {
      const key = `findStandingOfTeamsByYear-${year}`
      const data = await cacheService.getCacheByKey(
        key,
        raceResultService.findStandingOfTeamsByYear.bind(raceResultService, Number(year))
      )
      res.status(200).json({
        cache: true,
        massage: `Kết quả thi đấu của các team tham gia năm ${year}`,
        data
      })
    } else {
      const data = await raceResultService.findStandingOfTeamsByYear(Number(year))
      res.status(200).json({
        cache: false,
        massage: `Kết quả thi đấu của các team tham gia năm ${year}`,
        data
      })
    }
  } catch (error) {
    res.status(404)
    return next(new Error('Error'))
  }
}
// tìm thành tích chung cuộc của một team theo năm
export const getStandingOfYearByTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = req.params.year || 2023
    let team = req.params.team
    if (process.env.Redis === 'true') {
      const key = `findStandingOfYearByTeam-${year}-${team}`
      team = team.replace(new RegExp('-', 'g'), ' ')
      const data = await cacheService.getCacheByKey(
        key,
        raceResultService.findRaceResultOfYearByTeam.bind(raceResultService, Number(year), team)
      )
      res.status(200).json({
        cache: true,
        massage: `Kết quả thi đấu của team ${team}  năm ${year}`,
        data
      })
    } else {
      team = team.replace(new RegExp('-', 'g'), ' ')
      const data = await raceResultService.findRaceResultOfYearByTeam(Number(year), team)
      res.status(200).json({
        cache: false,
        massage: `Kết quả thi đấu của team ${team}  năm ${year}`,
        data
      })
    }
  } catch (error) {
    res.status(404)
    return next(new Error('Error'))
  }
}
//Tìm kết quả chung cuộc của giải đua theo năm ở các nước.
export const getAllRaceResultsOfYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Neu khong truyen thi mat dinh la nam 2023
    const year = req.params.year || 2023
    if (process.env.Redis === 'true') {
      const key = `findRaceResultsOfYear-${year}`
      const data = await cacheService.getCacheByKey(
        key,
        raceResultService.findRaceResultsOfYear.bind(raceResultService, Number(year))
      )
      res.status(200).json({
        cache: true,
        message: `kết quả chung cuộc của giải đua năm ${year} ở các nước.`,
        data
      })
    } else {
      const data = await raceResultService.findRaceResultsOfYear(Number(year))
      res.status(200).json({
        cache: false,
        message: `kết quả chung cuộc của giải đua năm ${year} ở các nước.`,
        data
      })
    }
  } catch (error) {
    res.status(404)
    return next(new Error('Error'))
  }
}
export const getRaceResultOfYearByCountry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Nếu không truyền năm thì mặt đinh là năm 2023
    const year = req.params.year || 2023
    const country = req.params.country
    if (process.env.Redis === 'true') {
      const key = `findRaceResultsOfYearByCountry-${country}-${year}`
      const data = await cacheService.getCacheByKey(
        key,
        raceResultService.findRaceResultsOfYearByCountry.bind(raceResultService, Number(year), country)
      )
      res.status(200).json({
        cache: true,
        message: `Kết quả của giải đua năm ${year} ở  nước ${country}.`,
        data
      })
    } else {
      const data = await raceResultService.findRaceResultsOfYearByCountry(Number(year), country)
      res.status(200).json({
        cache: false,
        message: `Kết quả của giải đua năm ${year} ở  nước ${country}.`,
        data
      })
    }
  } catch (error) {
    res.status(404)
    return next(new Error('Error'))
  }
}
// tìm kết quả của giải đấu theo tên A vào năm B ở địa điểm C
// ví dụ ở vào năm 2023 ở BAHRAIN có các giải phụ như FASTEST LAPS, STARTING GRID
export const getRaceResultByNameOfYearByCountry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = req.params.year || 2023
    const country = req.params.country
    const nameRace = req.params.nameRace.replace(new RegExp('-', 'g'), '_')
    if (process.env.Redis) {
      const key = `findRaceResultByNameOfYearByCountry-${country}-${year}-${nameRace}`
      const data = await cacheService.getCacheByKey(
        key,
        raceResultService.findRaceResultByNameOfYearByCountry.bind(raceResultService, Number(year), country, nameRace)
      )
      res.status(200).json({
        cache: true,
        message: `Kết quả của giải đua phụ ${nameRace} năm ${year} ở ${country}. `,
        data
      })
    } else {
      const data = await raceResultService.findRaceResultByNameOfYearByCountry(Number(year), country, nameRace)
      res.status(200).json({
        cache: false,
        message: `Kết quả của giải đua phụ ${nameRace} năm ${year} ở ${country}. `,
        data
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404)
    return next(new Error('Error'))
  }
}
//Giải thưởng vòng  nhanh nhất theo năm
export const getFastestLapAwardOfYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = req.params.year || 2023

    if (process.env.Redis) {
      const key = `findFastestLapAwardOfYear-${year}`
      const data = await cacheService.getCacheByKey(
        key,
        raceResultService.findFastestLapAwardOfYear.bind(raceResultService, Number(year))
      )
      res.status(200).json({
        cache: true,
        message: `Kết quả vòng nhanh nhất năm ${year} DHL FASTEST LAP AWARD`,
        data
      })
    } else {
      const data = await raceResultService.findFastestLapAwardOfYear(Number(year))
      res.status(200).json({
        cache: false,
        message: `Kết quả vòng nhanh nhất năm ${year} DHL FASTEST LAP AWARD`,
        data
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404)
    return next(new Error('Error'))
  }
}
