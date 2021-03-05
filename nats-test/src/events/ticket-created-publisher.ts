import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subject } from './channels';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;

};