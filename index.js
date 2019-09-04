import express from 'express';
import auth from './routes/authRoutes';
import mentors from './routes/mentorsRoutes';
import sessions from './routes/sessionsRoutes';
import admin from './routes/adminRoutes';

const app = express();

app.use(express.json());
app.use('/api/v1/auth', auth);
app.use('/api/v1/mentors', mentors);
app.use('/api/v1/sessions', sessions);
app.use('/api/v1/user/', admin);


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

export default app;