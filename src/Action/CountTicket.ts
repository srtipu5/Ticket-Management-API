// import { log, redis, TicketModel } from 'rms-lib'
import { getRepository } from 'typeorm'
import { TicketModel } from '../Database/Model/Ticket'
import { TicketCountRequestParams } from '../Request/CountTicketParams'

export async function countTicket(reqParms: TicketCountRequestParams): Promise<any> {
  try {
    const [data, total] = await TicketModel.findAndCount({
      where: {
        company_uid: reqParms.company_uid,
        assigned_team: reqParms.assigned_team,
      },
    })

    let queryBuilder = await TicketModel.createQueryBuilder().select('status').addSelect('COUNT(*)').groupBy('status')

    if (reqParms.company_uid !== undefined) {
      queryBuilder = queryBuilder.where('company_uid = :company_uid', { company_uid: reqParms.company_uid })
    }

    if (reqParms.assigned_team !== undefined) {
      queryBuilder = queryBuilder.andWhere('assigned_team = :assigned_team', { assigned_team: reqParms.assigned_team })
    }

    const tickets = await queryBuilder.getRawMany()

    let ticket_status: any = {
      total: total,
      open: 0,
      investigating: 0,
      wfi: 0,
      resolved: 0,
      closed: 0,
      reopen: 0
    }

    tickets.forEach(ticket => {
      ticket_status[ticket.status] = +ticket.count
    })

    return ticket_status
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-count-ticket !!')
  }
}
