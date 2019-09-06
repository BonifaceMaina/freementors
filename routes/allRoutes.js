import express from 'express';
import sessionRoutes from './sessionsRoutes';
import mentorRoutes from './mentorsRoutes';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';

const route = express.Router();
route.use('/auth', authRoutes);
route.use('/mentors', mentorRoutes);
route.use('/sessions', sessionRoutes);
route.use('/user', adminRoutes);

export default route;
