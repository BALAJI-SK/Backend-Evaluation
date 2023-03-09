const {collection}=require('../../database/models/index');
const HttpError = require('../utils/errors/httpError');
const createCollection = async (contentId,collectionFields) => {
	try{
		const collectionCreated = await collection.create({
			contentId,
			collectionFields
		});
		return collectionCreated;
	}catch(err){
		throw new HttpError(404, 'Collection not created');
	}
};
const updateCollection = async (collectionFields,collectionId) => {
	try{
		const collectionUpdated = await collection.update({
			collectionFields
		},
		{
			where: {id: collectionId}
		});
		return collectionUpdated;
	}catch(err){
		throw new HttpError(404, 'Collection not updated');
	}
};
const deleteCollection = async (collectionId) => {
	try{
		const collectionDeleted = await collection.destroy({
			where: {id: collectionId}
		});
		return collectionDeleted;
	}catch(err){
		throw new HttpError(404, 'Collection not deleted');
	}
};


module.exports = {  createCollection ,updateCollection ,deleteCollection};

