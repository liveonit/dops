import AWS from "aws-sdk"
import { DescribeRegionsResult } from "aws-sdk/clients/ec2";
import { ListSecretsResponse } from "aws-sdk/clients/secretsmanager";
import Table from "cli-table"
import YAML from "js-yaml"
import ora from "ora"
import Vorpal from 'vorpal'
import { getConfig } from "."

const spinner = ora("Loading unicorns");

module.exports = (program: Vorpal) => {
  program
    .command(
      "aws secrets ls",
      "aws list ec2 instances for actual region"
    )
    .option(
      "-r, --region <region>",
      "aws list ec2 instances for specific region or all"
    )
    .option(
      "-f, --format <format>",
      "aws list ec2 instances in json or yaml format"
    )
    .action(async args => {
      const config: any = await getConfig(program);
      if (config !== undefined) {
        config.apiVersion = '2017-10-17';
        const params = { DryRun: false };
        let secrets: any[] = [];
        if (args.options.region !== "all") {
          if (args.options.region !== undefined) {
            config.region = args.options.region
          }
          const sm = new AWS.SecretsManager(config);
          const secrets: ListSecretsResponse = await sm.listSecrets().promise();
          console.log(secrets.SecretList);
        }
        else { // region === "all"
          const ec2 = new AWS.EC2(config);
          const regionsResult: DescribeRegionsResult = await ec2.describeRegions().promise();
          await Promise.all(
            (regionsResult.Regions || []).map(
              async reg => {
                config.region = reg.RegionName;
                const sm = new AWS.SecretsManager(config);
                const secrets: ListSecretsResponse = await sm.listSecrets().promise();
                console.log(secrets.SecretList);
              }));
        }
      }
    })
}