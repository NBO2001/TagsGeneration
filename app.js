require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

const addUsersRouter = require('./Routes/Users/addUsers');
const listUsersRouter = require('./Routes/Users/listUsers');

app.use('/api/addUsers', addUsersRouter);
app.use('/api/listUsers', listUsersRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
