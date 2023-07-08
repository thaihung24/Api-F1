import express from 'express'
import {
  getAllRaceResultsOfYear,
  getFastestLapAwardOfYear,
  getRaceResultByNameOfYearByCountry,
  getRaceResultOfYearByCountry
} from '~/controllers/raceResultControllers'

const router = express.Router()
//Giải thưởng vòng  nhanh nhất theo năm
router.route('/fastestLap/:year').get(getFastestLapAwardOfYear)
router.route('/').get(getAllRaceResultsOfYear)
//Thống kê người chiến thắng theo năm ở từng địa điểm
router.route('/:year').get(getAllRaceResultsOfYear)
//Thống kê kết quả chung cuộc theo năm ở địa điểm nhất định
router.route('/:year/:country').get(getRaceResultOfYearByCountry)
//Thống kê kết quả vào năm A ở địa điểm B của cuộc đua C
router.route('/:year/:country/:nameRace').get(getRaceResultByNameOfYearByCountry)

export default router
