// import { log, redis, TicketModel } from 'rms-lib'
import { TicketLogType } from '../Util/TicketLogType'
import { saveTicketLog } from './SaveTicketLog'
import { TicketModel } from '../Database/Model/Ticket'
import { TicketDeleteRequestParams } from '../Request/DeleteRequestParams'

export async function deleteTicket(reqParms: TicketDeleteRequestParams): Promise<number> {
  try {
    const { id, deleted_by } = reqParms

    const ticket = await TicketModel.find({
      where: {
        id,
      },
    })

    if (ticket.length < 1) return 0

    let row
    if (ticket[0].opened_by === deleted_by) {
      row = await TicketModel.delete({ id })
    }

    // save ticket log
    if (row?.affected) await saveTicketLog({ticket_id: id, created_by: deleted_by, action: TicketLogType.DELETE})

    return row?.affected || 0
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-delete-ticket !!')
  }
}
