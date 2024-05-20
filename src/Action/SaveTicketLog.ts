// import { log, redis, TicketLogModel } from 'rms-lib'
import { SaveTicketLog } from '../Request/SaveTicketLog'
import { TicketLogModel } from '../Database/Model/TicketLog'

export async function saveTicketLog(data: SaveTicketLog): Promise<TicketLogModel[]> {
  try {
    const { ticket_id, items, created_by, action } = data

    const ticketLog = await TicketLogModel.save([
      {
        ticket_id,
        items,
        created_by,
        action
      },
    ])

    const last_ticket_log = await TicketLogModel.find({
      order: {
        created_at: 'DESC',
      },
      take: 1,
    })

    return last_ticket_log
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket-log !!')
  }
}
