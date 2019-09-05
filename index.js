import express from 'express';
import route from './routes/allRoutes';

const app = express();

app.use(express.json());
app.use('/api/v1', route);


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

export default app;