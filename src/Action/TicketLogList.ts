import { log, redis } from 'rms-lib'
import { FindManyOptions } from 'typeorm'
import { TicketLogModel } from '../Database/Model/TicketLog'
import { TicketLogSearchParams } from '../Request/TicketLogSearchParams'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

interface Log {
  total: number
  items: TicketLogModel[]
}

export async function TicketLogList(reqParms: TicketLogSearchParams): Promise<Log> {
  try {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, ...queryParams } = reqParms
    const {
     ticket_id,
     created_by,
     action
    } = queryParams

    const filterOptions: FindManyOptions<TicketLogModel> = {
      where: {
        ticket_id,
        created_by,
        action
      },
      order: {
        created_at: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    }

    const [data, total] = await TicketLogModel.findAndCount(filterOptions)

    return {
      total,
      items: data,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-ticket-log !!')
  }
}
