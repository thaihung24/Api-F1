import { Request, Response, NextFunction } from 'express'

import raceService from '~/services/race.services'

export const getNameRacesOfYearByCountry = async (req: Request, res: Response, next: NextFunction) => {
  const year = req.params.year || 2023
  const country = req.params.country
  if (!country) {
    res.status(404).json({
      message: 'Country not found'
    })
  }
  try {
    const data = await raceService.findNameRacesOfYearByCountry(Number(year), country)
    res.status(200).json({
      message: 'success',
      data
    })
  } catch (error) {
    return next(new Error('Error'))
  }
}
