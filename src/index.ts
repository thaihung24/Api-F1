import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import databaseService from './services/database.services'
import route from './routers'
const app = express()
app.use(bodyParser.json())
// const router = express.Router()
route(app)
databaseService.connect().catch(console.dir)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message })
})

app.listen(3000, () => {
  console.log('Live app listening on port 3000')
})
