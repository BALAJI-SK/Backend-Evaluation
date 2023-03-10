const authValidator = require('../middlewares/validator');
const collectionController = require('../controllers/collection.controller');


const collectionRoute = require('express').Router();


collectionRoute.post('/create',authValidator, collectionController.createCollection);

collectionRoute.put('/update/:id',authValidator, collectionController.updateCollection);

collectionRoute.delete('/delete/:id',authValidator, collectionController.deleteCollection);




module.exports = collectionRoute;

