"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sequelize_1 = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};
// sequelizeインスタンス作成(DBとの接続)
let sequelize = process.env.DATABASE_URL ?
    new sequelize_1.Sequelize(process.env.DATABASE_URL)
    : new sequelize_1.Sequelize(config.database, config.usename, config.password, config);
// modelsディレクトリ内のモデルファイルをdbにまとめる
fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model.initialize(sequelize);
    console.log(model.name);
    console.log(model);
});
// アソシエーションを設定
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// dbにsequelizeインスタンスとsequelizeモジュールを紐付ける
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
