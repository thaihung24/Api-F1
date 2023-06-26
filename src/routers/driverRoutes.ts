import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()
import { getDriverController } from '~/controllers/driverControllers'
router.route('/').get(getDriverController)
export default router
