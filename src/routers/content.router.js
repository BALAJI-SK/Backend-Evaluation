const contentController = require('../controllers/content.controller');

const contentRoute = require('express').Router();

contentRoute.post('/create', contentController.createContent);

contentRoute.put('/update/:id', contentController.updateContent);



contentRoute.get('/get', contentController.getAllContent);

contentRoute.get('/get/:id', contentController.getContentById);

contentRoute.post('/create/field/:id', contentController.createContentField);

module.exports = contentRoute;