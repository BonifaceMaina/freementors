const config = require('config');
const express  = require('express');
const auth = require('./routes/authRoutes');
const mentors = require('./routes/mentorsRoutes');
const sessions = require('./routes/sessionsRoutes');
const admin = require('./routes/adminRoutes');

const app = express();

if(!config.get('privateKey')){
	console.error('FATAL: No private key defined in config');
}
app.use(express.json());
app.get('/', (req, res)=>{
	res.status(200).json({
		message: 'Welcome to the FreeMentors API'
	});
});
app.use('/api/v1/auth', auth);
app.use('/api/v1/mentors', mentors);
app.use('/api/v1/sessions', sessions);
app.use('/api/v1/user/', admin);


const port = process.env.PORT || 3000;

// if(!module.parent){ app.listen(port); }
if (process.env.NODE_ENV !== 'test') {
	// app.listen(port);
	app.listen(port, ()=> console.log(`Listening on port ${port}...`));
}
module.exports = app;