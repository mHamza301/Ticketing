import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotAuthorizedError, validateRequest, NotFoundError, requireAuth } from '@brokerhs/common';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id', 
requireAuth,
[
    body('title')
        .not().
        isEmpty()
        .withMessage('Title is Mandatory'),
    body('price')
        .not()
        .isEmpty()
        .isFloat({gt: 0})
        .withMessage('Price should be greater than 0')
],
validateRequest,
async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        throw new NotFoundError();
    }

    if(ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    
    await ticket.save();
    console.log(typeof(ticket.userId));
    
    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
    });
    
    res.send(ticket);

});

export { router as updateTicketRouter };