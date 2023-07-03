import express, { Request, Response, NextFunction } from 'express'
import { getStandingsOfTeamsByYear } from '~/controllers/raceControllers'
const router = express.Router()

router.route('/').get(getStandingsOfTeamsByYear)

//Xem bang xep hang cua cac team theo nam
router.route('/:year').get(getStandingsOfTeamsByYear)
export default router
