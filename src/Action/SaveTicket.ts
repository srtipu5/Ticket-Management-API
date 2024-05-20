import { log, redis, SMSGateway, WebSocketService } from 'rms-lib'
// import { SMSGateway } from 'rms-lib'
import { TicketSaveRequestBody } from '../Request/SaveRequestBody'
import { TicketModel } from '../Database/Model/Ticket'
import { saveTicketLog } from './SaveTicketLog'
import { TicketLogType } from '../Util/TicketLogType'
import { uniqueTokenGenerator } from './UniqueTokenGenerator'
import { findUserPhone } from './FindUserPhone'
import { smsContent } from './SmsContent'
import { getCompanyUserUid } from './GetCompanyUserUid'
import { findSiteName } from './FindSiteName'

export async function saveTicket(reqBody: TicketSaveRequestBody): Promise<TicketModel[]> {
  try {
    const {
      title,
      description,
      category,
      sub_category,
      site_uid,
      company_uid,
      opened_by,
      assigned_team,
      assigned_to,
      status,
      priority,
      meta_data,
      files,
    } = reqBody

    const token = await uniqueTokenGenerator()
    const ticket = await TicketModel.save([
      {
        token,
        title,
        description,
        category,
        sub_category,
        site_uid,
        company_uid,
        opened_by,
        assigned_team,
        assigned_to,
        status,
        priority,
        meta_data,
        files,
      },
    ])

    const site_name = await findSiteName(site_uid)

    if(assigned_team){
      const phone = await findUserPhone(assigned_team)
      // if(site_name && phone)  await SMSGateway.send(phone, await smsContent(site_name, token))
    } 

    if(assigned_to){
      const phone = await findUserPhone(assigned_to)
      // if(site_name && phone)  await SMSGateway.send(phone, await smsContent(site_name, token))
    } 

    const user_uid = await getCompanyUserUid(opened_by)
    if (user_uid)
      await WebSocketService.send({
        userUid: user_uid,
        event: 'RMS_TICKET_CREATE',
        payload: ticket[0],
      })

    // save ticket log
    for (let i = 0; i < ticket.length; i++) {
      await saveTicketLog({
        ticket_id: ticket[i].id,
        created_by: ticket[i].opened_by,
        action: TicketLogType.SAVE,
      })
    }

    return ticket
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket !!')
  }
}
