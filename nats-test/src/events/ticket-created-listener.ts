import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subject } from './channels';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
    queueGroupName = 'payment-srv';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log(
            'Event Data!', data
        );
        msg.ack();
    };
};
