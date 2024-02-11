import { query } from 'express-validator'
import { ValidatorMiddleware } from 'rms-lib'

export interface TicketLogSearchParams {
  page?: number
  limit?: number
  ticket_id?: number
  created_by?: number 
  action?: number
}

export const TicketLogSearchValidator = ValidatorMiddleware([
  query('page').optional().isInt().toInt(),
  query('limit').optional().isInt().toInt(),
  query('ticket_id').optional().isInt().toInt(),
  query('created_by').optional().isInt().toInt(),
  query('action').optional().isInt().toInt(),

])
