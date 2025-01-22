const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// const authRoutes = require('./routes/');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes
const kycRoutes = require('./routes/kycRoutes');
const planRoutes = require('./routes/rechargeplans');
const rechargepayment = require('./routes/rechargepayment');


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Add user routes
app.use('/api/transactions', transactionRoutes); // Add transaction routes
app.use('/api/kyc', kycRoutes);
app.use('/api/plans',planRoutes );
app.use('/api/recharge',rechargepayment );



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
