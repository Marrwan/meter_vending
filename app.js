const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('./models');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());

// Sync Database
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});


const meterRoute = require('./routes/meter');
app.use('/api/meter', meterRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
