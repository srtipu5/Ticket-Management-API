import { body } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketSaveRequestBody {
  title: string
  description?: string
  category: string 
  sub_category: string 
  site_uid: number
  company_uid: number
  opened_by: number
  assigned_team?: number
  assigned_to?: number
  status: string  
  priority: string
  meta_data?: JSON
  files?: JSON
}


export const TicketSaveValidator = ValidatorMiddleware([
  body('title').isString().trim(),
  body('description').optional().isString().trim(),
  body('category').isString().trim(),
  body('sub_category').isString().trim(),
  body('site_uid').isInt().toInt(),
  body('company_uid').isInt().toInt(),
  body('opened_by').isInt().toInt(),
  body('assigned_team').optional().isInt().toInt(),
  body('assigned_to').optional().isInt().toInt(),
  body('status').isString().trim(),
  body('priority').isString().trim(),
  body('meta_data').optional(),
  body('files').optional().isArray(),
])
