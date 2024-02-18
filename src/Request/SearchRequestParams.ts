import { query } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketSearchRequestParms {
  page?: number
  limit?: number
  id?: number
  title?: string
  description?: string
  category?: string
  sub_category?: string
  site_uid?: number
  company_uid?: number
  opened_by?: number
  assigned_to?: number
  status?: string
  priority?: string
}

export const TicketSearchValidator = ValidatorMiddleware([
  query('page').optional().isInt().toInt(),
  query('limit').optional().isInt().toInt(),
  query('id').optional().isInt().toInt(),
  query('title').optional().isString().trim(),
  query('description').optional().isString().trim(),
  query('category').optional().isString().trim(),
  query('sub_category').optional().isString().trim(),
  query('site_uid').optional().isInt().toInt(),
  query('company_uid').optional().isInt().toInt(),
  query('opened_by').optional().isInt().toInt(),
  query('assigned_to').optional().isInt().toInt(),
  query('status').optional().isString().trim(),
  query('priority').optional().isString().trim(),
])
