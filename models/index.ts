import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db: { [index: string]: Sequelize | any } = {};

// sequelizeインスタンス作成(DBとの接続)
let sequelize: Sequelize = process.env.DATABASE_URL ?
  new Sequelize(process.env.DATABASE_URL)
  : new Sequelize(config.database, config.usename, config.password, config);

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
db.Sequelize = Sequelize;

export default db;