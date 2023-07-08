import express from 'express'
const router = express.Router()
import { getDriverByYear, getStandingsByNameOfYear } from '~/controllers/driverControllers'
router.route('/').get(getDriverByYear)

//Tìm các tay đua đã tham gia vào năm ... (/2023) năm 2023
router.route('/:year').get(getDriverByYear)

//Tìm thành tích của 1 tay đua vào năm ...
//( /2023/Max-Verstappen-VER )  tay đua Max Verstappen VER năm 2023
router.route('/:year/:name').get(getStandingsByNameOfYear)
// router.route('/:id').get(getDriverById)
export default router
