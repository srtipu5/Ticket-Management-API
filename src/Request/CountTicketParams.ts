import { query } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketCountRequestParams {
  company_uid?: number
  assigned_team?: number
}


export const TicketCountValidator = ValidatorMiddleware([
    query('company_uid').optional().isInt().toInt(),
    query('assigned_team').optional().isInt().toInt(),
])
