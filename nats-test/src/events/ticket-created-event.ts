import { Subject } from './channels';

export interface TicketCreatedEvent {
    subject: Subject.TicketCreated;
    data : {
        id: string;
        title: string;
        price: number;
    };
};