import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '12password'
        })
        .expect(201);
});

it('returns a 400 on invalid email', () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtestcom',
            password: '12password'
        })
        .expect(400);
});


it('returns a 400 on invalid password', () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtestcom',
            password: '1d'
        })
        .expect(400);
});

it('returns a 400 on missing email and password', () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});


it('disallow duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1password'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});