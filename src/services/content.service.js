const {content, collection}=require('../../database/models/index');
const HttpError = require('../utils/errors/httpError');
const contentUtils = require('../utils/content.util');
const createContent = async (contentName,contentField) => {
	try{
		const contentCreated = await content.create({
			contentName,
			contentField
		});
		return contentCreated;
	}catch(err){
		throw new HttpError(500, err.message);
	}
};

// Here I am Using JSON Object for contentField so appending the
// new filds to the existing JSON Object not required
const updateContent = async (contentName,contentField ,contentId) => {
	try{
		const countCollection = await collection.findAll({
			where: {contentId},
			attributes:['collectionFields']
		});
		const countCollectionLength = contentUtils.countCollectionLength(countCollection, contentField);
		console.log(countCollectionLength);
		if(countCollectionLength !=0){
			await content.update({
				contentName
			},
			{
				where: {id: contentId}
			});
			return 'Failed';
			
			
		}		else{
			
			const collectionData = await collection.findAll({
				attributes: ['id', 'collectionFields'],
				where: {contentId},
			});
			const updateCollectionJson = contentUtils.updateCollectionJson(collectionData, contentField);
			await collection.bulkCreate(updateCollectionJson, {
				updateOnDuplicate: ['collectionFields']
			});
			contentField = contentUtils.updateContentField(contentField);
			const contentUpdated = await content.update({
				contentName,
				contentField
			},
			{
				where: {id: contentId}
			});
			return contentUpdated;
		}
	}catch(err){
		throw new HttpError(500, err.message);
	}
};


const getAllContent = async () => {
	try{
		const contentGotFromDB = await content.findAll({
			attributes: ['id', 'contentName', 'contentField']
		}
		);
		return contentGotFromDB;
	}catch(err){
		throw new HttpError(500, err.message);
	}
};


const getContentById = async () => {
	try{
		const contentGotFromDB = await content.findAll({
			attributes: ['id', 'contentName', 'contentField'],
			include: [{
				model: collection,
				as : 'collection',
				attributes: ['id',  'collectionFields']
			}]
		});
		return contentGotFromDB;
	}catch(err){
		throw new HttpError(500, err.message);
	}
};


const createContentField = async (contentId,contentField) => {
	try{
		const contentdata = await content.update({
			contentField
		},
		{
			where: {id: contentId}
		});
		const collectionData = await collection.findAll({
			attributes: ['id', 'collectionFields'],
			where: {contentId},
		});
		const updateCollectionJson = contentUtils.updateCreateCollectionJson(collectionData, contentField);
		await collection.bulkCreate(updateCollectionJson, {
			updateOnDuplicate: ['collectionFields']
		});


		return contentdata;


	}catch(err){
		throw new HttpError(500, err.message);
	}
};




const deleteContent = async (contentId,FieldName) => {
	try{
		const contentData = await content.findOne({
			attributes: ['id','contentField',],
			where: {id: contentId},
		});
		delete contentData.contentField[FieldName];
		const getData = await collection.findAll({
			attributes: ['id', 'collectionFields','contentId'],
			where: {contentId},
		});
		const contentdata = contentUtils.deleteContent(getData ,FieldName);
		await collection.bulkCreate(contentdata, {
			updateOnDuplicate: ['collectionFields'],
			returning: false

		}
		);
		const updateDb = await content.update({
			contentField: contentData.contentField
		},
		{
			where: {id: contentId}
		});
		
		return updateDb;
	}
	catch(err){
		throw new HttpError(500, err.message);
	}
};




module.exports = {  createContent , updateContent ,getAllContent ,getContentById, createContentField ,deleteContent};