"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Work extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            done_date: sequelize_1.DataTypes.DATEONLY,
            done_hours: sequelize_1.DataTypes.REAL,
            note: sequelize_1.DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Work'
        });
        return this;
    }
    static associate(models) {
        this.belongsTo(models.Category);
    }
}
;
module.exports = Work;
