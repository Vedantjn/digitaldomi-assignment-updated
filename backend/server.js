// backend/server.js
const express = require('express');
const cors = require('cors');
const nftRoutes = require('./routes/nftRoutes');
const config = require('./config/config');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', nftRoutes);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));