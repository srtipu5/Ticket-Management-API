import { query } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketSitewiseCountRequestParams {
  status: string
  company_uid: number
  assigned_to?: number
}


export const SitewiseTicketCountValidator = ValidatorMiddleware([
    query('status').isString().trim(),
    query('company_uid').isInt().toInt(),
    query('assigned_to').optional().isInt().toInt(),
])
