import { body } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketUpdateRequestBody {
  id: number
  //token: number
  //title: string
  description?: string
  category?: string 
  sub_category?: string 
  //site_uid: number
  //company_uid: number
  //opened_by: number
  assigned_team?: number
  assigned_to?: number
  status?: string  
  priority?: string
  meta_data?: JSON
  files?: JSON
  updated_by: number
}


export const TicketUpdateValidator = ValidatorMiddleware([
  body('id').isInt().toInt(),
  //body('token').optional().isInt().toInt(),
  //body('title').optional().isString().trim(),
  body('description').optional().isString().trim(),
  body('category').optional().isString().trim(),
  body('sub_category').optional().isString().trim(),
  //body('site_uid').optional().isInt().toInt(),
  //body('company_uid').optional().isInt().toInt(),
  //body('opened_by').optional().isInt().toInt(),
  body('assigned_team').optional().isInt().toInt(),
  body('assigned_to').optional().isInt().toInt(),
  body('status').optional().isString().trim(),
  body('priority').optional().isString().trim(),
  body('meta_data').optional(),
  body('files').optional().isArray(),
  body('updated_by').isInt().toInt()
])
