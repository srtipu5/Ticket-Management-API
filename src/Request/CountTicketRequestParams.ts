import { query } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketCountRequestParams {
  status: string
}


export const TicketCountValidator = ValidatorMiddleware([
    query('status').isString().trim(),
])
