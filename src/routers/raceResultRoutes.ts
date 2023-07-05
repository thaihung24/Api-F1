import express from 'express'
import {
  getAllRaceResultsOfYear,
  getRaceResultByNameOfYearByCountry,
  getRaceResultOfYearByCountry
} from '~/controllers/raceResultControllers'

const router = express.Router()

router.route('/').get(getAllRaceResultsOfYear)

router.route('/:year').get(getAllRaceResultsOfYear)
router.route('/:year/:country').get(getRaceResultOfYearByCountry)
router.route('/:year/:country/:nameRace').get(getRaceResultByNameOfYearByCountry)

export default router
