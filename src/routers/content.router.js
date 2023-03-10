const contentController = require('../controllers/content.controller');
const authValidator = require('../middlewares/validator');
const contentRoute = require('express').Router();

contentRoute.post('/create',authValidator, contentController.createContent);

contentRoute.put('/update/:id',authValidator, contentController.updateContent);



contentRoute.get('/get',authValidator, contentController.getAllContent);

contentRoute.get('/get/all', authValidator,contentController.getContentById);

contentRoute.post('/create/field/:id',authValidator, contentController.createContentField);

contentRoute.delete('/delete/:id',authValidator, contentController.deleteContent);

module.exports = contentRoute;