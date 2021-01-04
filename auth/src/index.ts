import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';


import { currentuserRouter } from './routes/currentuser';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-Found-Error';

//Initialization and Middleware
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(  
  cookieSession({
    signed: false,
    secure: false // Ingress Nginx not properly configured so, cookie 
                  // is website is not being loaded for https. 
  })
);


app.use(currentuserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);


app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

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
