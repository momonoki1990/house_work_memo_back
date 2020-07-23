import { Sequelize, DataTypes, Model } from 'sequelize';


class Work extends Model {
  public id!: number;
  public done_date!: Date;
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
      done_date: DataTypes.DATEONLY,
      done_hours: DataTypes.REAL,
      note: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Work'
    });
    return this;
  }
  public static associate(models: { [index: string]: Sequelize | any }) {
    this.belongsTo(models.Category);
  }
};
  
module.exports = Work;