import { Publisher, Subject, TicketUpdatedEvent } from '@brokerhs/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject : Subject.TicketUpdated = Subject.TicketUpdated;
};