const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

const PORT = process.env.PORT || config.get('PORT') || 5000;

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['POST', 'GET', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(cookieParser());
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', homeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || config.get('MONGODB_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => {
      console.log(`Server has been started on PORT: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server error: ${err.message}`);
    process.exit(1);
  }
}
start();
