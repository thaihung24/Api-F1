import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import Driver from '~/models/schemas/Drivers.schemas'
import RaceResult from '~/models/schemas/RaceResults.schemas'
import Races from '~/models/schemas/Races.schemas'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@f1.hmmi0fz.mongodb.net/?retryWrites=true&w=majority`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(`${process.env.DB_NAME}`)
  }
  async connect() {
    // eslint-disable-next-line no-useless-catch
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      throw err
    }
  }
  get drivers(): Collection<Driver> {
    return this.db.collection('drivers')
  }
  get race_results(): Collection<RaceResult> {
    return this.db.collection('race_results')
  }
  get races(): Collection<Races> {
    return this.db.collection('races')
  }
}
//Tao object tu class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
