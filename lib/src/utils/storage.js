"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var lodash_1 = require("lodash");
var Storage = /** @class */ (function () {
    /**
     * Create storage manager for save data in file
     *
     * @param {string} fileFullPath full file's path, including filename
     */
    function Storage(fileFullPath) {
        this.path = fileFullPath;
        if (!fs_1.default.existsSync(this.path)) {
            fs_1.default.writeFileSync(this.path, JSON.stringify({}));
        }
    }
    Storage.prototype.getItem = function (name) {
        var data = JSON.parse(fs_1.default.readFileSync(this.path).toString() || "{}");
        return lodash_1.get(data, name, undefined);
    };
    Storage.prototype.setItem = function (name, value) {
        var data = JSON.parse(fs_1.default.readFileSync(this.path).toString() || "{}");
        data[name] = value;
        fs_1.default.writeFileSync(this.path, JSON.stringify(data));
    };
    Storage.prototype.deleteItem = function (name) {
        var data = JSON.parse(fs_1.default.readFileSync(this.path).toString() || "{}");
        delete data[name];
        fs_1.default.writeFileSync(this.path, JSON.stringify(data));
    };
    Storage.prototype.clear = function () {
        fs_1.default.writeFileSync(this.path, "");
    };
    return Storage;
}());
exports.default = Storage;
