import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import  request  from 'supertest';

let mongo: any;

declare global {
    namespace NodeJS {
        interface Global {
            authHelper(): Promise<string[]>
        }
    }
}




beforeAll( async () => {
    process.env.JWT_KEY = 'asdfasddf';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

});

beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll( async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.authHelper = async () => {

    const email = 'test@test.com';
    const password = '12password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);
    
    const cookie = response.get('Set-Cookie');

    return cookie;
};