import { body } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketSaveRequestBody {
  title: string
  description?: string
  category: number
  sub_category: number
  site_uid: number
  company_uid: number
  opened_by: number
  assigned_to?: number
  status?: number
  priority?: number
  meta_data?: JSON
  files?: JSON
}


export const TicketSaveValidator = ValidatorMiddleware([
  body('title').isString().trim(),
  body('description').optional().isString().trim(),
  body('category').isInt().toInt(),
  body('sub_category').isInt().toInt(),
  body('site_uid').isInt().toInt(),
  body('company_uid').isInt().toInt(),
  body('opened_by').isInt().toInt(),
  body('assigned_to').optional().isInt().toInt(),
  body('status').optional().isInt().toInt(),
  body('priority').optional().isInt().toInt(),
  body('meta_data').optional(),
  body('files').optional().isArray(),
])
