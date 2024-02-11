import { log, redis } from 'rms-lib'
import { TicketSaveRequestBody } from '../Request/SaveRequestBody'
import { TicketModel } from '../Database/Model/Ticket'
import { saveTicketLog } from './SaveTicketLog'
import { TicketLogType } from '../Util/TicketLogType'

export async function saveTicket(reqBody: TicketSaveRequestBody): Promise<number> {
  try {
    const {
      title,
      description,
      category,
      sub_category,
      site_uid,
      company_uid,
      opened_by,
      assigned_to,
      status,
      priority,
      meta_data,
      files,
    } = reqBody

    const ticket = await TicketModel.save([
      {
        title,
        description,
        category,
        sub_category,
        site_uid,
        company_uid,
        opened_by,
        assigned_to,
        status,
        priority,
        meta_data,
        files,
      },
    ])

    // save ticket log
    for (let i = 0; i < ticket.length; i++) {
      await saveTicketLog({
        ticket_id: ticket[i].id,
        created_by: ticket[i].opened_by,
        action: TicketLogType.SAVE,
      })
    }

    return ticket.length || 0
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket !!')
  }
}
