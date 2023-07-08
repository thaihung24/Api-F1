import express from 'express'
import { getStandingOfYearByTeam, getStandingsOfTeamsByYear } from '~/controllers/raceResultControllers'
const router = express.Router()

router.route('/').get(getStandingsOfTeamsByYear)

//Xem bang xep hang cua cac team theo nam
router.route('/:year').get(getStandingsOfTeamsByYear)

//Xem bang xep hang cua 1  team theo nam
router.route('/:year/:team').get(getStandingOfYearByTeam)
export default router
