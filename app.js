require('dotenv').config();
const express = require('express')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5082;

const addUsersRouter = require('./Routes/Users/addUsers');
const listUsersRouter = require('./Routes/Users/listUsers')

const addUepRouter = require('./Routes/Uep/addUep');
const updateUepRouter = require('./Routes/Uep/updateUep');
const seachUeoRouter = require('./Routes/Uep/seachUep')

const addTagRouter = require('./Routes/Tag/addTag')
const listTags = require('./Routes/Tag/listTags')

const addClientRouter = require('./Routes/Clients/addClient');
const listClientsRouter = require('./Routes/Clients/listClients')

const addSectorRouter = require('./Routes/Sectors/addSector')
const listSectorsRouter = require('./Routes/Sectors/listSectors')

const addCheckListRouter = require('./Routes/CheckList/addItem')
const listCheckListRouter = require('./Routes/CheckList/listItems')

const seachBoxRouter = require('./Routes/Boxs/seachBox')
const updateBoxRouter = require('./Routes/Boxs/updateBox')
const addBoxRouter = require('./Routes/Boxs/addBox');
const getUeps = require('./Routes/Boxs/getAllBoxs')

app.use('/api/addUsers', addUsersRouter)
app.use('/api/listUsers', listUsersRouter)
app.use('/api/addUep', addUepRouter)
app.use('/api/addBox', addBoxRouter)
//Mudar depois
app.use('/api/addTag', addTagRouter)
app.use('/api/tags', addTagRouter)

app.use('/api/updateUep', updateUepRouter)
app.use('/api/addClient', addClientRouter)
app.use('/api/listClients', listClientsRouter)
app.use('/api/addSector', addSectorRouter)
app.use('/api/listSectors', listSectorsRouter)
app.use('/api/addItem', addCheckListRouter)
app.use('/api/listCheck', listCheckListRouter)
app.use('/api/seachUep', seachUeoRouter)
app.use('/api/seachBox', seachBoxRouter)
app.use('/api/updateBox', updateBoxRouter)
app.use('/api/tag',listTags)

app.use('/api/getueps', getUeps)

app.listen(port, () => console.log(`Listening on port ${port}`))
