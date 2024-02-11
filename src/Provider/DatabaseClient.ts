import { log } from 'rms-lib'
import { createConnection } from 'typeorm'
import { TicketModel } from '../Database/Model/Ticket'
import { TicketLogModel } from '../Database/Model/TicketLog'

export default {
  async connect() {
    try {
      await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST as string,
        port: +process.env.DB_PORT!,
        username: process.env.DB_USER as string,
        password: process.env.DB_PASS as string,
        database: process.env.DB_NAME as string,
        entities: [TicketModel, TicketLogModel],
        synchronize: false,
        logging: false,
      })
      log(`Connected to DB ... ${process.env.DB_HOST}`)
    } catch (error) {
      log('DB Connection Failed !', error)
    }
  },
}
