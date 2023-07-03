import { Request, Response, NextFunction } from 'express'
import driverRoutes from './driverRoutes'
import teamRoutes from './teamRoutes'
import raceRoutes from './raceRoutes'

function route(app: any) {
  app.use('/api/drivers', driverRoutes)
  app.use('/api/teams', teamRoutes)
  app.use('/api/races', raceRoutes)
}
export default route
