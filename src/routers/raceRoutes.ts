import express from 'express'
import { getNameRacesOfYearByCountry } from '~/controllers/raceControllers'

const router = express.Router()

// danh sách các giải phụ theo năm ở địa điểm nhất định
router.route('/:year/:country').get(getNameRacesOfYearByCountry)
export default router
