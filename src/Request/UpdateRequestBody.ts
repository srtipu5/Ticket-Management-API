import { body } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketUpdateRequestBody {
  id: number
  //title?: string
  description?: string
  category?: number
  sub_category?: number
  //site_uid?: number
  //company_uid?: number
  // opened_by?: number
  assigned_to?: number
  status?: number
  priority?: number
  meta_data?: JSON
  files?: JSON
  updated_by: number
}


export const TicketUpdateValidator = ValidatorMiddleware([
  body('id').isInt().toInt(),
  //body('title').optional().isString().trim(),
  body('description').optional().isString().trim(),
  body('category').optional().isInt().toInt(),
  body('sub_category').optional().isInt().toInt(),
  //body('site_uid').optional().isInt().toInt(),
  //body('company_uid').optional().isInt().toInt(),
  //body('opened_by').optional().isInt().toInt(),
  body('assigned_to').optional().isInt().toInt(),
  body('status').optional().isInt().toInt(),
  body('priority').optional().isInt().toInt(),
  body('meta_data').optional(),
  body('files').optional().isArray(),
  body('updated_by').isInt().toInt()
])
