import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()
import {
  getDriverById,
  getDriverByYear,
  getDriverController,
  getStandingsByNameOfYear
} from '~/controllers/driverControllers'
router.route('/').get(getDriverController)

//get All driver by year
// router.route('/:year').get(getDriverByYear)
// router.route('/:year/:name').get(getStandingsByNameOfYear)
router.route('/:id').get(getDriverById)
export default router
