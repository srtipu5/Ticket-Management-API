import { query } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketDeleteRequestParams {
  id: number
  deleted_by: number
}


export const TicketDeleteValidator = ValidatorMiddleware([
    query('id').isInt().toInt(),
    query('deleted_by').isInt().toInt()
])
