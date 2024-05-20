// import { log, redis, TicketLogModel } from 'rms-lib'
import { TicketLogModel } from '../Database/Model/TicketLog'
import { TicketDeleteRequestParams } from '../Request/DeleteRequestParams'


export async function deleteTicketLog(reqParms: TicketDeleteRequestParams): Promise<number> {
  try {
    const { id, deleted_by } = reqParms

    const log = await TicketLogModel.find({
      where: {
        id,
      },
    })

    if (log.length < 1) return 0

    let row

    // deleted_by should be admin
    if (log[0].created_by !== deleted_by) {
      row = await TicketLogModel.delete({ id })
    }

    return row?.affected || 0
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-delete-ticket-log !!')
  }
}
