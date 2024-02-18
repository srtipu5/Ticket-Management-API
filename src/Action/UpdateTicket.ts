import { log, redis } from 'rms-lib'

import { TicketModel } from '../Database/Model/Ticket'
import { TicketUpdateRequestBody } from '../Request/UpdateRequestBody'
import { saveTicketLog } from './SaveTicketLog'
import { TicketLogType } from '../Util/TicketLogType'
import { MetaData } from '../Util/MetaType'

export async function updateTicket(reqBody: TicketUpdateRequestBody): Promise<TicketModel[]> {
  try {
    const {
      id,
      //title,
      description,
      category,
      sub_category,
      //site_uid,
      //company_uid,
      //opened_by,
      assigned_to,
      priority,
      status,
      meta_data,
      files,
      updated_by,
    } = reqBody

    const before_ticket = await TicketModel.find({
      where: {
        id,
      },
    })

    if (before_ticket.length < 1) return []

    const commonFields = {
      status,
      meta_data,
      files
    }
    
    const specificFields = before_ticket[0].opened_by === updated_by
      ? {
          //title,
          description,
          category,
          sub_category,
          //site_uid,
          //company_uid,
          //opened_by,
          assigned_to,
          priority,
        }
      : {}
    
    const updatedFields = { ...commonFields, ...specificFields }
    
    const row = await TicketModel.update({ id }, updatedFields)
    
    const after_ticket = await TicketModel.find({
      where: {
        id,
      },
    })

    // save ticket log
    if(row?.raw > 0) await saveLog(before_ticket[0],after_ticket[0],id,updated_by)

    return after_ticket
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-update-ticket !!')
  }
}

async function saveLog(before_ticket: any, after_ticket: any, ticket_id: number, created_by: number) {
  let items: { [key: string]: any } = {}

    for (const key in before_ticket) {
      if (key === 'created_at' || key === 'updated_at') continue
      if (
        before_ticket.hasOwnProperty(key) &&
        after_ticket.hasOwnProperty(key) &&
        before_ticket[key as keyof TicketModel] !== after_ticket[key as keyof TicketModel]
      ) {
        if (key === 'meta_data') {
          if (compareMetaData(before_ticket[key], after_ticket[key])) {
            items[key] = after_ticket[key as keyof TicketModel]
          }
        } else if (key === 'files') {
          if (!compareArrays(before_ticket[key], after_ticket[key])) {
            items[key] = after_ticket[key as keyof TicketModel]
          }
        } else {
          items[key] = after_ticket[key as keyof TicketModel]
        }
      }
    }

    await saveTicketLog({
      ticket_id,
      items: JSON.parse(JSON.stringify(items)),
      created_by,
      action: TicketLogType.UPDATE,
    })

}

function compareMetaData(before: any, after: any): boolean {
  for (const key in before) {
    if (before.hasOwnProperty(key) && after.hasOwnProperty(key)) {
      const beforeArray = before[key as keyof MetaData]
      const afterArray = after[key as keyof MetaData]

      if (!Array.isArray(beforeArray) || !Array.isArray(afterArray)) {
        // If not an array, compare the values directly
        if (before[key as keyof MetaData] !== after[key as keyof MetaData]) {
          return true
        }
      } else {
        // If an array, compare each element
        if (beforeArray.length !== afterArray.length) {
          return true
        }

        for (let i = 0; i < beforeArray.length; i++) {
          if (
            beforeArray[i].description !== afterArray[i].description ||
            beforeArray[i].time !== afterArray[i].time ||
            beforeArray[i].who !== afterArray[i].who
          ) {
            return true
          }
        }
      }
    }
  }

  return false
}

function compareArrays(before: any, after: any): boolean {
  if (before.length !== after.length) return false
  for (let i = 0; i < before.length; i++) {
    if (before[i] !== after[i]) return false
  }
  return true
}
