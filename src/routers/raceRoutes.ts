import express from 'express'
import { getNameRacesOfYearByCountry } from '~/controllers/raceControllers'

const router = express.Router()

router.route('/:year/:country').get(getNameRacesOfYearByCountry)
export default router
