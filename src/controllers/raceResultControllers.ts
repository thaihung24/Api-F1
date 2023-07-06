import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import raceResultService from '~/services/raceResult.service'
import cacheService from '~/services/cache.services'
dotenv.config()
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
        massage: 'success',
        data
      })
    } else {
      const data = await raceResultService.findStandingOfTeamsByYear(Number(year))
      res.status(200).json({
        cache: false,
        massage: 'success',
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
        message: 'sucess',
        data
      })
    } else {
      const data = await raceResultService.findRaceResultsOfYear(Number(year))
      res.status(200).json({
        message: 'sucess',
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
        message: 'success',
        data
      })
    } else {
      const data = await raceResultService.findRaceResultsOfYearByCountry(Number(year), country)
      res.status(200).json({
        cache: false,
        message: 'success',
        data
      })
    }
  } catch (error) {
    res.status(404)
    return next(new Error('Error'))
  }
}
// tìm kết quả của giải đấu theo tên A vào năm B ở địa điểm C
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
        message: 'success',
        data
      })
    } else {
      const data = await raceResultService.findRaceResultByNameOfYearByCountry(Number(year), country, nameRace)
      res.status(200).json({
        message: 'success',
        data
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404)
    return next(new Error('Error'))
  }
}
