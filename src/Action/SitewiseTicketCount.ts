
// import { log, redis, TicketModel } from 'rms-lib'
import { getRepository } from 'typeorm'
import { TicketSitewiseCountRequestParams } from '../Request/SitewiseTicketRequestParams'
import { TicketModel } from '../Database/Model/Ticket'


export async function sitewiseTicketCount(reqParms: TicketSitewiseCountRequestParams): Promise<any> {
    try {
      
        const tickets = await TicketModel.find({
          select: ['site_uid', 'status', 'assigned_to'],
          where: {
            status: reqParms.status.toLowerCase(),
            company_uid: reqParms.company_uid,
            assigned_to: reqParms.assigned_to,
          },
        })
        
        const groupedTickets: { [site_uid: string]: number } = {}
        
        tickets.forEach((ticket) => {
          const site_uid = ticket.site_uid.toString()
          groupedTickets[site_uid] = (groupedTickets[site_uid] || 0) + 1
        })
        
        const ticketCounts = Object.keys(groupedTickets).map((site_uid) => ({
          site_uid: parseInt(site_uid, 10),
          [`total_${reqParms.status}`]: groupedTickets[site_uid],
        }))
        
        return ticketCounts
   
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong from rms-count-ticket !!')
    }
  }

