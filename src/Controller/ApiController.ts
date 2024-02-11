import { NextFunction, Request, Response } from 'express'
import { log } from 'rms-lib'
import Controller from './Controller'
import { TicketSaveRequestBody, TicketSaveValidator } from '../Request/SaveRequestBody'
import { TicketUpdateRequestBody, TicketUpdateValidator } from '../Request/UpdateRequestBody'
import { TicketDeleteRequestParams, TicketDeleteValidator } from '../Request/DeleteRequestParams'
import { TicketSearchRequestParms, TicketSearchValidator } from '../Request/SearchRequestParams'
import { saveTicket } from '../Action/SaveTicket'
import { updateTicket } from '../Action/UpdateTicket'
import { deleteTicket } from '../Action/DeleteTicket'
import { listTicket } from '../Action/ListTicket'


export default class ApiController extends Controller {
  async receive(req: Request<unknown, unknown, TicketSaveRequestBody, unknown>, res: Response, next: NextFunction) {
    try {
      log('received rms ticket save api -> ', req.body)
      const response = await saveTicket(req.body)
      //log('rms ticket save api sent response -> ', response)
      res.json(response)
    } catch (error) {
      log(error)
      next(error)
    }
  }

  async update(req: Request<unknown, unknown, TicketUpdateRequestBody, unknown>, res: Response, next: NextFunction) {
    try {
      log('received rms ticket update api -> ', req.body)
      const response = await updateTicket(req.body)
      //log('rms ticket update api sent response -> ', response)
      res.json(response)
    } catch (error) {
      log(error)
      next(error)
    }
  }

  async delete(req: Request<unknown, unknown, unknown, TicketDeleteRequestParams>, res: Response, next: NextFunction) {
    try {
      log('received rms ticket delete api -> ', req.query)
      const response = await deleteTicket(req.query)
      log('rms ticket delte api sent response -> ', response)
      res.json(response)
    } catch (error) {
      log(error)
      next(error)
    }
  }

  async list(req: Request<unknown, unknown, unknown, TicketSearchRequestParms>, res: Response, next: NextFunction) {
    try {
      log('received rms ticket list api -> ', req.query)
      const response = await listTicket(req.query)
      log('rms ticket list api sent response -> ', response)
      res.json(response)
    } catch (error) {
      log(error)
      next(error)
    }
  }


  register() {
    this.router.post('/ticket-create', [TicketSaveValidator], this.receive.bind(this)),
    this.router.post('/ticket-update', [TicketUpdateValidator], this.update.bind(this)),
    this.router.get('/ticket-delete', [TicketDeleteValidator], this.delete.bind(this)),
    this.router.get('/ticket-list', [TicketSearchValidator], this.list.bind(this))
    return this.router
  }
}
