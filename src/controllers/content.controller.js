const contentService = require('../services/content.service');
const HttpError = require('../utils/errors/httpError');

const createContent = async (req, res) => {
	try{
		const {contentName,contentField} = req.body;
		const content = await contentService.createContent(contentName,contentField);
		res.status(200).json(content);
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json(err.message);
		}else{
			res.status(500).json(err.message);
		}
	}
};

const updateContent = async (req, res) => {
	try{
		const {contentName,contentField} = req.body;
		const contentId = req.params.id;
		const content = await contentService.updateContent(contentName,contentField,contentId);
		res.status(200).send(content);
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json(err.message);
		}else{
			res.status(500).json(err.message);
		}
	}
};
const getAllContent = async (req, res) => {
	try{
		const content = await contentService.getAllContent();
		res.status(200).json(content);
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json(err.message);
		}else{
			res.status(500).json(err.message);

		}
	}
};


const getContentById = async (req, res) => {
	try{
	
		const content = await contentService.getContentById();
		res.status(200).json(content);
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json(err.message);
		}else{
			res.status(500).json(err.message);

		}
	}
};
const createContentField = async (req, res) => {
	try{
		const {contentField} = req.body;
		const contentId = req.params.id;
		const content = await contentService.createContentField(contentId,contentField);
		res.status(200).json( {message:'Pass', content});
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json(err.message);
		}else{
			res.status(500).json(err.message);

		}
	}

};

const deleteContent = async (req, res) => {
	try{
		const contentId = req.params.id;
		const {fieldName} = req.query;
		console.log(fieldName,contentId);
		await contentService.deleteContent(contentId,fieldName);
		res.status(200).json({message:'Pass'});
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json(err.message);
		}else{
			res.status(500).json(err.message);
		}
	}
};


module.exports = {  createContent, updateContent ,getAllContent ,getContentById ,createContentField ,deleteContent};
