"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var chalk_1 = __importDefault(require("chalk"));
var ora_1 = __importDefault(require("ora"));
var spinner = ora_1.default('Loading unicorns');
var __1 = require("../../");
var _1 = require("./");
module.exports = function (program) {
    if (__1.storage.getItem("aws_profiles") === undefined) {
        __1.storage.setItem("aws_profiles", {
            noConnect: {
                accessKeyId: "notConnect",
                secretAccessKey: "notConnect",
                region: "notConnect"
            }
        });
        __1.storage.setItem("selectedProfile", "noConnect");
    }
    program
        .command("aws profile config <profile>", "aws create profile")
        .action(function (args) { return __awaiter(_this, void 0, void 0, function () {
        var profiles, keyIdChunk, secretAccessKeyChunk, actualConfig, questions, inputProfile, accessKeyId, secretAccessKey, region;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profiles = __1.storage.getItem("aws_profiles") || {};
                    keyIdChunk = "";
                    secretAccessKeyChunk = "";
                    actualConfig = profiles[args.profile] || undefined;
                    if (actualConfig !== undefined) {
                        console.log(chalk_1.default.cyan("Update aws profile: "));
                        if (actualConfig.accessKeyId !== undefined) {
                            keyIdChunk = actualConfig.accessKeyId.slice(-5);
                        }
                        if (actualConfig.secretAccessKey !== undefined) {
                            secretAccessKeyChunk = actualConfig.secretAccessKey.slice(-5);
                        }
                    }
                    else {
                        program.log(chalk_1.default.cyan("Create new aws profile: "));
                    }
                    questions = [
                        {
                            name: "accessKeyId",
                            type: "input",
                            message: "AWS Access Key ID" +
                                (actualConfig ? "[*********" + keyIdChunk + "]: " : ": ")
                        },
                        {
                            name: "secretAccessKey",
                            type: "input",
                            message: "AWS Secret Access Key" +
                                (actualConfig ? "[*********" + secretAccessKeyChunk + "]: " : ": ")
                        },
                        {
                            name: "region",
                            type: "input",
                            message: "Default region name" +
                                (actualConfig ? "[" + actualConfig.region + "]: " : ": ")
                        }
                    ];
                    return [4 /*yield*/, program.activeCommand.prompt(questions)];
                case 1:
                    inputProfile = _a.sent();
                    accessKeyId = inputProfile["accessKeyId"] || actualConfig.accessKeyId;
                    secretAccessKey = inputProfile["secretAccessKey"] || actualConfig.secretAccessKey;
                    region = inputProfile["region"] || actualConfig.region;
                    profiles[args.profile] = { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region };
                    __1.storage.setItem("aws_profiles", profiles);
                    return [2 /*return*/];
            }
        });
    }); });
    program.command("aws profile select").action(function (args) { return __awaiter(_this, void 0, void 0, function () {
        var questions, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    questions = [
                        {
                            name: "selectedProfile",
                            type: "list",
                            message: "Select profile: ",
                            choices: Object.entries(__1.storage.getItem("aws_profiles") || {}).map(function (dato) { return dato[0]; })
                        }
                    ];
                    return [4 /*yield*/, program.activeCommand.prompt(questions)];
                case 1:
                    response = _a.sent();
                    __1.storage.setItem("selectedProfile", response["selectedProfile"]);
                    return [2 /*return*/];
            }
        });
    }); });
    program.command("aws profile which").action(function (args) { return __awaiter(_this, void 0, void 0, function () {
        var selProf;
        return __generator(this, function (_a) {
            selProf = __1.storage.getItem("selectedProfile");
            selProf === null
                ? program.log(chalk_1.default.red("You do not have a selected profile"))
                : program.log(chalk_1.default.green("Your selected profile is: " + selProf));
            return [2 /*return*/];
        });
    }); });
    program.command("aws profile get account").action(function (args) { return __awaiter(_this, void 0, void 0, function () {
        var config, iam, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _1.getConfig(program)];
                case 1:
                    config = _a.sent();
                    if (!(config !== undefined)) return [3 /*break*/, 3];
                    config["apiVersion"] = "2010-05-08";
                    iam = new aws_sdk_1.default.IAM(config);
                    return [4 /*yield*/, iam.listAccountAliases({ MaxItems: 10 }).promise()];
                case 2:
                    result = _a.sent();
                    program.log(chalk_1.default.green("Your actual account is: " + result.AccountAliases[0]));
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
