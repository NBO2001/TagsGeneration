const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const listTagsRouter = require('./Routes/Tag/listTags');

app.use('/api', listTagsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
