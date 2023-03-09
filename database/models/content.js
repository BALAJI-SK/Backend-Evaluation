'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class content extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.hasMany(
				models.collection,{
					foreignKey: 'contentId',
					as: 'collection',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				}
			);
		}
	}
	content.init({
		contentName: DataTypes.STRING,
		contentField: DataTypes.JSONB
	}, {
		sequelize,
		modelName: 'content',
	});
	return content;
};