import driverRoutes from './driverRoutes'
import teamRoutes from './teamRoutes'
import raceResultRoutes from './raceResultRoutes'
import raceRoutes from './raceRoutes'

function route(app: any) {
  app.use('/api/drivers', driverRoutes)
  app.use('/api/teams', teamRoutes)
  app.use('/api/raceResults', raceResultRoutes)
  app.use('/api/races', raceRoutes)
}
export default route
