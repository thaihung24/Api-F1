import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()
import { getDriverByYear, getDriverController } from '~/controllers/driverControllers'
router.route('/').get(getDriverController)

//get All driver by year
router.route('/:year').get(getDriverByYear)
export default router
