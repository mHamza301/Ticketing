import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentuserRouter } from './routes/currentuser';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/errorhandler';
import { NotFoundError } from './errors/not-dfound-error';

//Initialization and Middleware
const app = express();
app.use(json());

app.use(currentuserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);


app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

//Port initialization
app.listen(3000, () =>{
    console.log('Listening on Port 3000!!');
});