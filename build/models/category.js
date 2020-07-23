"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: sequelize_1.DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Category'
        });
        return this;
    }
    static associate(models) {
        this.hasMany(models.Work);
    }
}
;
module.exports = Category;
