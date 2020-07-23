'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category);
    }
  };
  Work.init({
    done_date: DataTypes.DATEONLY,
    categoryId: DataTypes.INTEGER,
    done_hours: DataTypes.REAL,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};