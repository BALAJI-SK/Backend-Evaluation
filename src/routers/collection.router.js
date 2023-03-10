
const collectionController = require('../controllers/collection.controller');


const collectionRoute = require('express').Router();


collectionRoute.post('/create', collectionController.createCollection);

collectionRoute.put('/update/:id', collectionController.updateCollection);

collectionRoute.delete('/delete/:id', collectionController.deleteCollection);




module.exports = collectionRoute;

