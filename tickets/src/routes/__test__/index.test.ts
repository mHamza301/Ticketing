import request from 'supertest';
import { app } from '../../app';

it('can fetch a list of tickets', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.authHelper())
        .send({
            title: 'ticket 1',
            price: 10
        });

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.authHelper())
        .send({
            title: 'ticket 2',
            price: 10
        });
    
    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
});

