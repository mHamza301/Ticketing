import mongoose from 'mongoose';
import { app } from './app';

const connectionStartup =  async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('There is a problem with Tokens!')
  }
  
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
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
