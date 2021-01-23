import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@brokerhs/common';
import { createTicketRouter } from './routes/new';

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

app.use(currentUser);

app.use(createTicketRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };