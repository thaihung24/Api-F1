import { count } from 'console'
import { Request, Response, NextFunction } from 'express'
import driverService from '~/services/driver.services'
import raceResultService from '~/services/raceResult.service'

export const getStandingsOfTeamsByYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = req.params.year || 2023
    const data = await raceResultService.findStandingOfTeamsByYear(Number(year))
    res.status(200).json({
      massage: 'success',
      data
    })
  } catch (error) {
    res.status(404)
    throw new Error('Error')
  }
}
export const getAllRaceResultsOfYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Neu khong truyen thi mat dinh la nam 2023
    const year = req.params.year || 2023
    const data = await raceResultService.findRaceResultsOfYear(Number(year))
    res.status(200).json({
      message: 'sucess',
      data
    })
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
    // Nếu không truyền country thì mặt định là lấy tất cả các gỉai đua của năm ... ở tất cả các địa điểm
    if (!country) {
      const data = await raceResultService.findRaceResultsOfYear(Number(year))
      res.status(200).json({
        message: 'sucess',
        data
      })
    }
    const data = await raceResultService.findRaceResultsOfYearByCountry(Number(year), country)
    res.status(200).json({
      message: 'success',
      data
    })
  } catch (error) {
    res.status(404)
    return next(new Error('Error'))
  }
}
