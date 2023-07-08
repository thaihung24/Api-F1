import { Request, Response, NextFunction } from 'express'
import driverService from '~/services/driver.services'
import dotenv from 'dotenv'
import cacheService from '~/services/cache.services'
dotenv.config()

export const getDriverByYear = async (req: Request, res: Response, next: NextFunction) => {
  const year = req.params.year || 2023
  // eslint-disable-next-line no-useless-catch
  try {
    if (process.env.Redis == 'true') {
      const key = `getDriversInYear-${year}`
      const result = await cacheService.getCacheByKey(
        key,
        driverService.getDriversInYear.bind(driverService, Number(year))
      )
      res.status(200).json({
        cache: true,
        message: `xem danh sách tất cả các tay đua theo năm ${year}`,
        data: result
      })
    } else {
      const result = await driverService.getDriversInYear(Number(year))
      res.status(200).json({
        cache: false,
        message: `xem danh sách tất cả các tay đua theo năm ${year}`,
        data: result
      })
    }
  } catch (error) {
    throw error
  }
}
export const getStandingsByNameOfYear = async (req: Request, res: Response, next: NextFunction) => {
  const year = req.params.year || 2023
  let name = req.params.name || ''
  name = name.replace(new RegExp('-', 'g'), ' ')
  const key = `findStandingsByNameOfYearCache-${name}-${year}`
  try {
    if (process.env.Redis == 'true') {
      const data = await cacheService.getCacheByKey(
        key,
        driverService.findStandingsByNameOfYear.bind(driverService, Number(year), name)
      )
      res.status(200).json({
        cache: true,
        message: `kết quả thi đấu của tay đua ${name} năm ${year}`,
        data
      })
    } else {
      const data = await driverService.findStandingsByNameOfYear(Number(year), name)
      res.status(200).json({
        cache: false,
        message: `kết quả thi đấu của tay đua ${name} năm ${year}`,
        data
      })
    }

    // const driversByCountry: Record<string, RaceResultType[] | any[]> = {} // Object to store drivers grouped by country
    // result?.forEach((result: RaceResultType | any) => {
    //   if (driversByCountry[result.country]) {
    //     driversByCountry[result.country].push(result)
    //   } else {
    //     driversByCountry[result.country] = [result]
    //   }
    // })

    // for (const country in driversByCountry) {
    //   driversByCountry[country].sort((a, b) => b.pts - a.pts) // Sort drivers in descending order based on pts
    //   driversByCountry[country].forEach((driver, index) => {
    //     driver.no = index + 1 // Assign a sequential number to each driver
    //   })
    // }
    // const data = Object.values(driversByCountry)
    //   .flat()
    //   .filter((res) => res.driver[0].driver == name)
  } catch {
    res.status(404)
    return next(new Error('Error'))
  }
}
