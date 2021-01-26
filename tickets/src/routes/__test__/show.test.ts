import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);

});

it('returns a ticket ', async () => {
    const title = 'Ticket';
    const price = 20;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.authHelper())
        .send({
            title, price
        })
        .expect(201)

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200)

});