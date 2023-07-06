import express from 'express'
const router = express.Router()
import { getDriverByYear, getStandingsByNameOfYear } from '~/controllers/driverControllers'
router.route('/').get(getDriverByYear)

//get All driver by year
router.route('/:year').get(getDriverByYear)
router.route('/:year/:name').get(getStandingsByNameOfYear)
// router.route('/:id').get(getDriverById)
export default router
