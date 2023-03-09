const collectionService = require('../services/collection.service');
const HttpError = require('../utils/errors/httpError');

const createCollection = async (req, res) => {
	try{
		const {contentId,collectionFields} = req.body;
		const collection = await collectionService.createCollection(contentId,collectionFields);
		if(!collection){
			throw new HttpError(404, 'Collection not created');
		}

		res.status(200).json(collection);
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json({message: err.message});
		}else{
			res.status(500).json({message: err.message});
		}
	}
};
const updateCollection = async (req, res) => {
	try{
		const {collectionFields} = req.body;
		const collectionId = req.params.id;
		const collection = await collectionService.updateCollection(collectionFields,collectionId);
		if(!collection){
			throw new HttpError(404, 'Collection not updated');
		}
		res.status(200).json(collection);
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json({message: err.message});
		}else{
			res.status(500).json({message: err.message});
		}
	}
};


const deleteCollection = async (req, res) => {
	try{
		const collectionId = req.params.id;
		const collection = await collectionService.deleteCollection(collectionId);
		if(!collection){
			throw new HttpError(404, 'Collection not deleted');
		}
		res.status(200).json(collection);
	}catch(err){
		if(err instanceof HttpError){
			res.status(err.statusCode).json({message: err.message});
		}else{
			res.status(500).json({message: err.message});
		}
	}
};




module.exports = {  createCollection ,updateCollection ,deleteCollection};
