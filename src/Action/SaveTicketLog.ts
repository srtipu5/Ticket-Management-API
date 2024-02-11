import { log, redis } from 'rms-lib'
import { SaveTicketLog } from '../Request/SaveTicketLog'
import { TicketLogModel } from '../Database/Model/TicketLog'

export async function saveTicketLog(data: SaveTicketLog): Promise<number> {
  try {
    const { ticket_id, items, created_by, action } = data

    const ticketLog = await TicketLogModel.save([
      {
        ticket_id,
        items,
        created_by,
        action,
      },
    ])

    return ticketLog.length || 0
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket-log !!')
  }
}
