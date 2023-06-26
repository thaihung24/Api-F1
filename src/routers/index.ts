import { Request, Response, NextFunction } from 'express'
import driverRoutes from './driverRoutes'

function route(app: any) {
  app.use('/api/drivers', driverRoutes)
}
export default route
