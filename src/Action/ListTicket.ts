// import { log, redis, TicketModel } from 'rms-lib'
import { FindManyOptions } from 'typeorm'
import { TicketModel } from '../Database/Model/Ticket'
import { TicketSearchRequestParms } from '../Request/SearchRequestParams'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

interface Tickets {
  total: number
  items: TicketModel[]
}

export async function listTicket(reqParms: TicketSearchRequestParms): Promise<Tickets> {
  try {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, ...queryParams } = reqParms
    const {
      id,
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
    } = queryParams

    const filterOptions: FindManyOptions<TicketModel> = {
      where: {
        id,
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
        priority
      },
      order: {
        created_at: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    }

    const [data, total] = await TicketModel.findAndCount(filterOptions)

    return {
      total,
      items: data,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-list-ticket !!')
  }
}
