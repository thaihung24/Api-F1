import express from 'express'
import { getAllRaceResultsOfYear, getRaceResultOfYearByCountry } from '~/controllers/raceControllers'

const router = express.Router()

router.route('/').get(getAllRaceResultsOfYear)

router.route('/:year').get(getAllRaceResultsOfYear)
router.route('/:year/:country').get(getRaceResultOfYearByCountry)
export default router
