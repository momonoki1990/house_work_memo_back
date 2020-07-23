"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var sequelize_1 = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var db = {};
// sequelizeインスタンス作成(DBとの接続)
var sequelize = new sequelize_1.Sequelize(config.database, config.usename, config.password, config);
// modelsディレクトリ内のモデルファイルをdbにまとめる
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(function (file) {
    var model = require(path.join(__dirname, file));
    db[model.name] = model.initialize(sequelize);
});
// アソシエーションを設定
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// dbにsequelizeインスタンスとsequelizeモジュールを紐付ける
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports["default"] = db;
