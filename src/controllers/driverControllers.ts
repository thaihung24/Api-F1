import { Request, Response, NextFunction } from 'express'
import { RaceResultType } from '~/models/schemas/RaceResults.schemas'
import driverService from '~/services/driver.services'
import raceResultService from '~/services/raceResult.service'
export const getDriverController = async (req: Request, res: Response, next: NextFunction) => {
  const { driver } = req.body
  // console.log(car)
  try {
    const result = await raceResultService.findByDriverId(driver)
    console.log(driver)
    return res.json({
      message: 'Success',
      data: result
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const data = await raceResultService.findByDriverId(id)
  res.json({
    message: 'success',
    data
  })
}
export const getDriverByYear = async (req: Request, res: Response, next: NextFunction) => {
  const year = req.params.year || 2023
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await driverService.getDriversInYear(Number(year))
    res.status(200).json({
      message: 'Success',
      data: result
    })
  } catch (error) {
    throw error
  }
}
export const getStandingsByNameOfYear = async (req: Request, res: Response, next: NextFunction) => {
  const year = req.params.year || 2023
  let name = req.params.name || ''
  name = name.replace(new RegExp('-', 'g'), ' ')
  try {
    const result = await driverService.findStandingsByNameOfYear(Number(year))
    const driversByCountry: Record<string, RaceResultType[] | any[]> = {} // Object to store drivers grouped by country
    result?.forEach((result: RaceResultType | any) => {
      if (driversByCountry[result.country]) {
        driversByCountry[result.country].push(result)
      } else {
        driversByCountry[result.country] = [result]
      }
    })

    for (const country in driversByCountry) {
      driversByCountry[country].sort((a, b) => b.pts - a.pts) // Sort drivers in descending order based on pts
      driversByCountry[country].forEach((driver, index) => {
        driver.no = index + 1 // Assign a sequential number to each driver
      })
    }
    const data = Object.values(driversByCountry)
      .flat()
      .filter((res) => res.driver[0].driver == name)
    res.status(200).json({
      message: 'success',
      data
    })
  } catch {
    res.status(404)
    return next(new Error('Error'))
  }
}
