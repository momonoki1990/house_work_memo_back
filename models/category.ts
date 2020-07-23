import { Sequelize, DataTypes, Model } from 'sequelize';


class Category extends Model {
  public id!: number;
  public done_date!: Date;
  public categoryId!: number;
  public done_hours!: number;
  public note: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Category'
    });
    return this;
  }
  public static associate(models: { [index: string]: Sequelize | any }) {
    this.hasMany(models.Work);
  }
};

module.exports = Category;