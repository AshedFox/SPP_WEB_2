import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import todosRouter from './routes/todosRoutes';
import accountRouter from './routes/accountRoutes';
import usersRouter from './routes/usersRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    preflightContinue: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    credentials: true,
    origin: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/todos', todosRouter);
app.use('/api/account', accountRouter);
app.use('/api/users', usersRouter);


mongoose.connect(process.env.CONNECTION_STRING as string).then(
    () => app.listen(port, () => console.log(`server started on port ${port}`)),
    (err) => console.log("error!", err)
);

export default app;
