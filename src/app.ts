import 'reflect-metadata'
require('dotenv').config()

import server from './Provider/HttpServer'
import database from './Provider/DatabaseClient'
import { log, redis } from 'rms-lib'

server.get('/',(req,res)=>{
  res.send('RMS-Ticket');
});

server.listen(process.env.HTTP_PORT, async () => {
  await database.connect()
  await redis.connect()
  log(`HTTP server is running on port: ${process.env.HTTP_PORT}`)
})