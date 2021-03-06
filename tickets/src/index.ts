import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const connectionStartup =  async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('There is a problem with Tokens!');
  }

  if(!process.env.MONGO_URI) {
    throw new Error('There is a problem with Database Connection!');
  }
  
  try {
    await natsWrapper.connect('ticketing', 'acgg12', 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());


    await mongoose.connect(process.env.MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true
   });  

   console.log('Database Connected');
  } catch (err) {
      console.error(err);
  }
    app.listen(3000, () => {
    console.log('Listening on Port 3000!!');
    });
};

connectionStartup();
