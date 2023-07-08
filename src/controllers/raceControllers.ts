import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import raceService from '~/services/race.services'
import cacheService from '~/services/cache.services'
dotenv.config()
export const getNameRacesOfYearByCountry = async (req: Request, res: Response, next: NextFunction) => {
  const year = req.params.year || 2023
  const country = req.params.country

  try {
    if (process.env.Redis === 'true') {
      const key = `findNameRacesOfYearByCountry-${country}-${year}`
      const data = await cacheService.getCacheByKey(
        key,
        raceService.findNameRacesOfYearByCountry.bind(raceService, Number(year), country)
      )
      res.status(200).json({
        cache: true,
        message: `Tìm danh sách các giải đua phụ năm ${year} ở  địa điểm đua ${country}`,
        data
      })
    } else {
      const data = await raceService.findNameRacesOfYearByCountry(Number(year), country)
      res.status(200).json({
        cache: false,
        message: `Tìm danh sách các giải đua phụ năm ${year} ở  địa điểm đua ${country}`,
        data
      })
    }
  } catch (error) {
    return next(new Error('Error'))
  }
}
