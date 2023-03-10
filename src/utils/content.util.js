
const updateDbOutput = (contentGotFromDB, collectionData) => {
	const contentField = Object.keys(contentGotFromDB.contentField);
	const contentGotFromDBJSON = collectionData.map((collection) => {

		const collectionUpdated= contentField.reduce((accumlator, content) => {
			if(collection.dataValues.collectionFields[content] === undefined)
				accumlator[content] =null;
			else
				accumlator[content]=collection.dataValues.collectionFields[content];
			return accumlator;
		}, {});
		
		return {collectionUpdated};
	});
	contentGotFromDB.collection = contentGotFromDBJSON;
	return contentGotFromDB;
};
const updateCreateCollection = (collectionData, contentField) => {
	const contentFieldValue = Object.values(contentField);
	const contetntFieldkeys = Object.keys(contentField);
	const deleteField = contentFieldValue.reduce((accumlator, content,index) => {
		if(contetntFieldkeys[index]!=content)

			accumlator.push(contetntFieldkeys[index]);
		return accumlator;
	}
	, []);
	const createField = contentFieldValue.reduce((accumlator, content,index) => {
		if(contetntFieldkeys[index]!=content)
			accumlator.push(content);
		return accumlator;
	}
	, []);
	const collectionDataJSON = collectionData.map((collection) => {
		const collectionFields= Object.keys(contentField).reduce((accumlator, content) => {
			if(collection.dataValues.collectionFields[content] === undefined)
				accumlator[content] =null;
			else
				accumlator[content]=collection.dataValues.collectionFields[content];
			return accumlator;
		}, {});
		return {collectionFields};
	});
	return {collectionDataJSON, deleteField, createField};
};


const updateCollectionJson = (collectionData, contentField) => {
	const contentFieldValue = Object.values(contentField);
	const contetntFieldkeys = Object.keys(contentField);
	const deleteField = contentFieldValue.reduce((accumlator, content,index) => {
		if(contetntFieldkeys[index]!=content)
			accumlator.push(contetntFieldkeys[index]);
		return accumlator;
	}
	, []);
	const createField = contentFieldValue.reduce((accumlator, content,index) => {
		if(contetntFieldkeys[index]!=content)
			accumlator.push(content);
		return accumlator;
	}
	, []);


	const collectionDataJSON = collectionData.map((collection) => {
		// const collectionFields= Object.keys(contentField).reduce((accumlator, content) => {
		// 	if(collection.dataValues.collectionFields[content] === undefined)
		// 		accumlator[content] ='';
		// 	else
		// 		accumlator[content]=collection.dataValues.collectionFields[content];
		// 	return accumlator;
		// }, {});
		delete collection.dataValues.collectionFields[deleteField[0]];
		collection.dataValues.collectionFields[createField[0]]='';

		return { id:collection.dataValues.id , collectionFields:collection.dataValues.collectionFields ,contentId:collection.dataValues.contentId };
	});
    
	return collectionDataJSON;
};





const  countCollectionLength = (countCollection, contentField) => {
	const contentFieldValue = Object.values(contentField);
	const contetntFieldkeys = Object.keys(contentField);
	const reduceField = contentFieldValue.reduce((accumlator, content,index) => {
		if(contetntFieldkeys[index]!=content && contentFieldValue[index]!=='')
			accumlator.push(contetntFieldkeys[index]);
		return accumlator;
	}
	, []);
	console.log(reduceField);
	const countCollectionLength = countCollection.reduce((accumlator,collection) => {
		if(collection.dataValues.collectionFields[reduceField[0]] === '');
		else
			accumlator++;
		return accumlator;
	}, 0);
	console.log(countCollectionLength);
	return countCollectionLength;

};


const updateContentField = (contentField) => {
	const contentFieldValue = Object.values(contentField);
	const contetntFieldkeys = Object.keys(contentField);
	const reduceField = contentFieldValue.reduce((accumlator, content,index) => {
		if(contetntFieldkeys[index]!=content && contentFieldValue[index]!=='')
			accumlator[content]=content;
		else if(contetntFieldkeys[index]!=content && contentFieldValue[index]==='')
			accumlator[contetntFieldkeys[index]]='';
		else
			accumlator[contetntFieldkeys[index]]=contetntFieldkeys[index];
		return accumlator;
	}
	, {});
	return reduceField;
};
    

const updateCreateCollectionJson = (collectionData, contentField) => {
	const collectionDataJSON = collectionData.map((collection) => {
		const collectionFields= Object.keys(contentField).reduce((accumlator, content) => {
			if(collection.dataValues.collectionFields[content] === undefined)
				accumlator[content] ='';
			else
				accumlator[content]=collection.dataValues.collectionFields[content];
			return accumlator;
		}, {});

		return { id:collection.dataValues.id , collectionFields:collectionFields ,contentId:collection.dataValues.contentId };
	});
	return collectionDataJSON;
};

const deleteContent = (collectionData,FieldName) => {
	const updateData = collectionData.map((collection) => {
		const tempdata= collection.dataValues.collectionFields;
		delete tempdata[FieldName];
		return { id:collection.dataValues.id , collectionFields:tempdata ,contentId:collection.dataValues.contentId };
	});
	console.log(updateData);
	return updateData;
};

module.exports = { updateDbOutput , updateCollectionJson , countCollectionLength,updateContentField,updateCreateCollectionJson ,deleteContent};