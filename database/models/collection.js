'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(
        models.content,{
        foreignKey: 'contentId',
        as: 'content',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
      )
    }
  }
  collection.init({
    collectionFields: DataTypes.JSONB,
    contentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'collection',
  });
  return collection;
};