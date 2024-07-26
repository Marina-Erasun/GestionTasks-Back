"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.PORT = exports.USER_DB_PASSWORD = exports.USER_DB_NAME = exports.HOST = exports.SECRET = exports.DB_TYPE = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
exports.DB_TYPE = process.env.DB_TYPE || 'mysql';
exports.SECRET = process.env.SECRET;
exports.HOST = process.env.HOST || 'localhost';
exports.USER_DB_NAME = process.env.USER_DB_NAME;
exports.USER_DB_PASSWORD = process.env.USER_DB_PASSWORD;
exports.PORT = parseInt(process.env.PORT || '3300', 10);
exports.DB_NAME = process.env.DB_NAME;
//# sourceMappingURL=config.js.map