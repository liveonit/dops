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
var cli_table_1 = __importDefault(require("cli-table"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var ora_1 = __importDefault(require("ora"));
var _1 = require(".");
var spinner = ora_1.default("Loading unicorns");
module.exports = function (program) {
    program
        .command("aws ec2 instances ls", "aws list ec2 instances for actual region")
        .option("-r, --region <region>", "aws list ec2 instances for specific region or all")
        .option("-f, --format <format>", "aws list ec2 instances in json or yaml format")
        .action(function (args) { return __awaiter(_this, void 0, void 0, function () {
        var config, ec2, params, result, instances_1, instanceWithRelevantProps, table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _1.getConfig(program)];
                case 1:
                    config = _a.sent();
                    if (!(config !== undefined)) return [3 /*break*/, 3];
                    config["apiVersion"] = "2016-11-15";
                    ec2 = new aws_sdk_1.default.EC2(config);
                    params = { DryRun: false };
                    if (!(args.options.region === undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, ec2.describeInstances(params).promise()];
                case 2:
                    result = _a.sent();
                    instances_1 = [];
                    if (result.Reservations !== undefined) {
                        result.Reservations.forEach(function (res) {
                            instances_1 = instances_1.concat((res.Instances || []));
                        });
                    }
                    instanceWithRelevantProps = instances_1.map(function (inst) {
                        return {
                            name: inst.KeyName || "-",
                            id: inst.InstanceId,
                            type: inst.InstanceType,
                            zone: config.region,
                            state: inst.State,
                            publicIp: inst.PublicIpAddress,
                            privateIp: inst.PrivateIpAddress,
                            publicDns: inst.PublicDnsName,
                            privateDns: inst.PrivateDnsName,
                            vpcID: inst.VpcId,
                            subnetId: inst.SubnetId,
                            sgIds: (inst.SecurityGroups || []).map(function (sg) { return sg.GroupId; })
                        };
                    });
                    if (args.options.format === undefined) {
                        table = new cli_table_1.default({
                            head: ["Name", "ID", "Type", "Zone", "State", "Public Ip", "Private Ip", "VPC", "Subnet", "Security Groups"],
                            colWidths: [50, 50, 50, 50, 50, 50, 50, 50, 50, 150]
                        });
                        table.push(instanceWithRelevantProps.map(function (inst) {
                            delete inst.publicDns;
                            delete inst.privateDns;
                            Object.values(inst);
                        }));
                        console.log(table);
                    }
                    else if (args.options.format.toLowerCase() === "json") {
                        console.log(instances_1);
                    }
                    else if (args.options.format.toLowerCase() === "yaml") {
                        program.log(js_yaml_1.default.dump(instances_1));
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
