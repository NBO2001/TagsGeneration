require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

const addUsersRouter = require('./Routes/Users/addUsers');
const listUsersRouter = require('./Routes/Users/listUsers');
const addUepRouter = require('./Routes/Uep/addUep');
const updateUepRouter = require('./Routes/Uep/updateUep');
const addBoxRouter = require('./Routes/Boxs/addBox');
const addTagRouter = require('./Routes/Tag/addTag');

app.use('/api/addUsers', addUsersRouter);
app.use('/api/listUsers', listUsersRouter);
app.use('/api/addUep', addUepRouter);
app.use('/api/addBox', addBoxRouter);
app.use('/api/addTag', addTagRouter);
app.use('/api/updateUep', updateUepRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
