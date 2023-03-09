//import express from 'express';
const express = require('express');
const app = express();
const port = 8080;
const contentRoute = require('./src/routers/content.router');
const collectionRoute = require('./src/routers/collection.router');
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.use('/content',contentRoute);

app.use('/collection',collectionRoute);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});