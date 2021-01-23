import mongoose from 'mongoose';
import { app } from './app';

const connectionStartup =  async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('There is a problem with Tokens!');
  }

  if(!process.env.MONGO_URI) {
    throw new Error('There is a problem with Database Connection!');
  }
  
  try {
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
