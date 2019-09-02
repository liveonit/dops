import AWS from "aws-sdk"
import color from "chalk"
import ora from "ora"
import { getConfig } from "./"
const spinner = ora("Loading unicorns");
import Table from "cli-table"
import YAML from "js-yaml"
import Vorpal from 'vorpal'

module.exports = (program: Vorpal) => {
  program
    .command("aws lambda ls", "list lambda functions in default region")
    .option("-r, --region <region>", "list ec2 instances for specific region")
    .option(
      "-f, --format <format>",
      "list ec2 instances in `json` or `yaml` format"
    )
    .action(async args => {
      const config: any = await getConfig(program);
      if (config !== undefined) {
        config["apiVersion"] = "2015-03-31";
        let lambda;
        const region = args.options.region;
        if (!region) lambda = new AWS.Lambda(config);
        else {
          config["region"] = region;
          lambda = new AWS.Lambda(config);
        }
        try {
          const result = await lambda
            .listFunctions({
              MaxItems: 10000
            })
            .promise();
          program.log(color.green(result.toString()));
        } catch (err) {
          program.log(color.red(err));
        }
      }
    });

  program
    .command(
      "aws lambda invoke <function>",
      "list lambda functions in default region"
    )
    .option("-r, --region <region>", "list ec2 instances for specific region")
    .option(
      "-i, --input <input>",
      "input of the lambda function, format JSON as string. Format: '{\"key\": \"value\", ... }' "
    )
    .option(
      "-fi, --file-in <input>",
      "route to json that is input of the lambda function"
    )
    .action(async args => {
      const config: any = await getConfig(program);
      if (config !== undefined) {
        config["apiVersion"] = "2015-03-31";
        let lambda;
        const region = args.options.region;
        if (!region) lambda = new AWS.Lambda(config);
        else {
          config["region"] = region;
          lambda = new AWS.Lambda(config);
        }

        const params = {
          FunctionName: args.function /* required */,
          InvocationType: "RequestResponse",
          LogType: "Tail",
          Payload: JSON.stringify(JSON.parse(args.options.input || '{}'))
        };
        spinner.start(`Executing the function...`);
        let data: any;
        let log: string = "";
        try {
          data = await lambda.invoke(params).promise();
          if (data !== undefined) {
            log = Buffer.from(data.LogResult, "base64").toString("ascii");
          }
        }
        catch (err) {
          spinner.fail(color.red(`Error: ${err}`));
        }
        if (data.StatusCode !== 200) {
          spinner.fail(
            `HttpError:\nStatus code: ${data.StatusCode}\nLogResult:\n ${log}`
          );
        } else if (data.StatusCode === 200) {
          spinner.succeed(
            color.green(`Success:\nStatus code: ${data.StatusCode}\n\Payload: ${data.Payload}\nLogResult:\n ${log}`)
          );
        }
      }
    });
};
