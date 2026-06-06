require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');


const app = express();
app.set('trust proxy', true);
connectDB();

app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
const corsOrigin = process.env.CORS_ORIGIN || '*';
const allowedOrigins = corsOrigin === '*' ? '*' : ['http://localhost:3000', 'http://localhost:3001', process.env.FRONTEND_URL, ...corsOrigin.split(',').map(s => s.trim())].filter(Boolean);
app.use(cors({ origin: allowedOrigins === '*' ? true : (origin, cb) => { cb(null, !origin || allowedOrigins.includes(origin)); }, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/services', require('./routes/services'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/contact', require('./routes/contacts'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/team', require('./routes/team'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/media', require('./routes/media'));
app.use('/api/seo', require('./routes/seo'));
app.use('/api/users', require('./routes/users'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
