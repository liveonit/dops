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
var chalk_1 = __importDefault(require("chalk"));
var ora_1 = __importDefault(require("ora"));
var spinner = ora_1.default("Loading unicorns");
var __1 = require("../../");
var utils_1 = require("../../utils");
var Method;
(function (Method) {
    Method[Method["rmi"] = 0] = "rmi";
    Method[Method["rmc"] = 1] = "rmc";
    Method[Method["rmv"] = 2] = "rmv";
    Method[Method["rmn"] = 3] = "rmn";
    Method[Method["stop"] = 4] = "stop";
})(Method = exports.Method || (exports.Method = {}));
exports.dokcerFunction = function (args, method) { return __awaiter(_this, void 0, void 0, function () {
    var presentContinuousAction_1, performedAction_1, performedActionWithouConjugation, actionType, elemType_1, listCommand, mainCommand_1, elementsList;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!testIfDockerExist) return [3 /*break*/, 1];
                __1.program.log(chalk_1.default.bold(chalk_1.default.red("Dock is not installed, please install them before using these commands")));
                return [2 /*return*/];
            case 1:
                performedActionWithouConjugation = void 0;
                actionType = void 0;
                listCommand = void 0;
                if (method === Method.stop) {
                    presentContinuousAction_1 = "Stoping";
                    performedAction_1 = "stoped";
                    performedActionWithouConjugation = "stop";
                    actionType = "stop";
                }
                else {
                    presentContinuousAction_1 = "Deleting";
                    performedAction_1 = "deleted";
                    performedActionWithouConjugation = "delete";
                    actionType = "rm";
                }
                switch (+method) {
                    case Method.rmi:
                        elemType_1 = "image";
                        listCommand = "docker image ls -q";
                        mainCommand_1 = function (image, forced) {
                            return "docker rmi " + (forced ? "-f " : " ") + ("" + image);
                        };
                        break;
                    case Method.rmc:
                        elemType_1 = "conatainer";
                        listCommand = "docker ps -q -f status=exited";
                        mainCommand_1 = function (container, forced) {
                            return "docker rm " + (forced ? "-f " : " ") + ("" + container);
                        };
                        break;
                    case Method.rmn:
                        elemType_1 = "network";
                        listCommand = "docker network ls -q";
                        mainCommand_1 = function (network, forced) { return "docker network rm " + ("" + network); };
                        break;
                    case Method.rmv:
                        elemType_1 = "volume";
                        listCommand = "docker volume ls -q";
                        mainCommand_1 = function (volume, forced) {
                            return "docker volume rm " + (forced ? "-f " : " ") + ("" + volume);
                        };
                        break;
                    case Method.stop:
                        elemType_1 = "container";
                        listCommand = "docker ps -q";
                        mainCommand_1 = function (container, forced) {
                            return !forced
                                ? "docker stop " + container
                                : "sudo docker update --restart=no " + container + " &&        docker stop " + container;
                        };
                        break;
                    default:
                        __1.program.log("Can't execute with this element");
                        return [2 /*return*/];
                }
                return [4 /*yield*/, utils_1.execute(listCommand)];
            case 2:
                elementsList = (_a.sent()).stdout
                    .trim()
                    .split(/ |\n/)
                    .filter(function (elem) { return elem !== ""; });
                if (elementsList.length === 0) {
                    __1.program.log("There are no active " + elemType_1 + "s");
                    return [2 /*return*/];
                }
                if (!args.options.forced) return [3 /*break*/, 3];
                elementsList.forEach(function (elem) { return __awaiter(_this, void 0, void 0, function () {
                    var code;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                spinner.start(presentContinuousAction_1 + " " + elemType_1 + " " + elem);
                                return [4 /*yield*/, utils_1.execute(mainCommand_1(elem, true))];
                            case 1:
                                code = (_a.sent()).code;
                                code === 0
                                    ? spinner.succeed(chalk_1.default.green("The " + elemType_1 + " " + elem + " was " + performedAction_1))
                                    : spinner.fail(chalk_1.default.red("The " + elemType_1 + " " + elem + " could not be " + performedAction_1));
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 6];
            case 3:
                elementsList.forEach(function (elem) { return __awaiter(_this, void 0, void 0, function () {
                    var code;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                spinner.start(presentContinuousAction_1 + " " + elem);
                                return [4 /*yield*/, utils_1.execute(mainCommand_1(elem, false))];
                            case 1:
                                code = (_a.sent()).code;
                                code === 0
                                    ? spinner.succeed(chalk_1.default.green(elem + " was " + performedAction_1))
                                    : spinner.fail(chalk_1.default.red("The " + elem + " could not be " + performedAction_1));
                                return [2 /*return*/];
                        }
                    });
                }); });
                spinner.start("Checking... \n");
                return [4 /*yield*/, utils_1.sleep(100)];
            case 4:
                _a.sent();
                return [4 /*yield*/, utils_1.execute(listCommand)];
            case 5:
                (_a.sent()).stdout.length === 0
                    ? spinner.succeed(chalk_1.default.green("All containers were " + performedAction_1))
                    : spinner.fail(chalk_1.default.rgb(200, 185, 53)("At least one " + elemType_1 + " did not " + performedActionWithouConjugation + "\n            or some container was restarted\nYou can try with ") +
                        chalk_1.default.rgb(31, 188, 193)("mk dokcer " + actionType + " ") +
                        chalk_1.default.blue("[options]") +
                        chalk_1.default.rgb(31, 188, 193)(" -f"));
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var testIfDockerExist = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, utils_1.execute("docker --help")];
        case 1: return [2 /*return*/, (_a.sent()).code === 0];
    }
}); }); };
