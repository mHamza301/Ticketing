import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import  request  from 'supertest';
import jwt from 'jsonwebtoken';


declare global {
    namespace NodeJS {
        interface Global {
            authHelper(): string[];
        }
    }
}

let mongo: any;

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

global.authHelper = () => {

    //Build a JWT payload => { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@testy.com'
    };

    //Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //Build a session Object { jwt: TOKEN }
    const session = {jwt: token};

    //Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    //Encode JSON to Base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //return string i.e Cookie with encoded data
    return [`express:sess=${base64}`];


};