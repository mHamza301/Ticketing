import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';
import { requireAuth } from '@brokerhs/common';

it('has a route listening to /api/tickets for post request', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toEqual(404);

});

it('can only be accessed if user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);

});

it('returns a status other than 401 if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.authHelper())
        .send({})

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {

});

it('returns an error if an invalid price is provided', async () => {

});

it('creates a ticket with valid parameters', async () => {

});