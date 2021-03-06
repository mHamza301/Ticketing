import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';


import { currentuserRouter } from './routes/currentuser';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@brokerhs/common';

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

export { app };