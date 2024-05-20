// import { log, redis, TicketModel } from 'rms-lib'
import { TicketModel } from "../Database/Model/Ticket"

export async function uniqueTokenGenerator(): Promise<number> {
      while (true) {
        const token = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000)

        const ticket = await TicketModel.findOne({
          where: {
            token,
          },
        })
  
        if (!ticket) return token
        
      }  
  
  }
  