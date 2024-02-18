

import { getRepository } from 'typeorm'
import { TicketModel } from '../Database/Model/Ticket'
import { TicketCountRequestParams } from '../Request/CountTicketRequestParams'


export async function countTicket(reqParms: TicketCountRequestParams): Promise<any> {
    try {
        const ticketRepository = getRepository(TicketModel)
        return ticketRepository
          .createQueryBuilder('tickets')
          .select('tickets.site_uid', 'site_uid')
          .addSelect('COUNT(*)', `total_${reqParms.status}`)
          .where('tickets.status = :status', { status: reqParms.status.toLowerCase() })
          .groupBy('tickets.site_uid')
          .getRawMany()
   
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong from rms-count-ticket !!')
    }
  }

