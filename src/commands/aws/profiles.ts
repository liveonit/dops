import AWS from 'aws-sdk'
import color from 'chalk'
import ora from 'ora'
const spinner = ora('Loading unicorns');
import Vorpal, { Args } from 'vorpal'
import { storage } from '../../'
import { getConfig } from './'

module.exports = (program: Vorpal) => {
  if (storage.getItem("aws_profiles") === undefined) {
    storage.setItem(
      "aws_profiles",
      {
        noConnect: {
          accessKeyId: "notConnect",
          secretAccessKey: "notConnect",
          region: "notConnect"
        }
      }
    );
    storage.setItem("selectedProfile", "noConnect");
  }
  program
    .command("aws profile config <profile>", "aws create profile")
    .action(async (args: Args) => {
      const profiles = storage.getItem("aws_profiles") || {};
      let keyIdChunk = "";
      let secretAccessKeyChunk = "";
      const actualConfig = profiles[args.profile] || undefined;
      if (actualConfig !== undefined) {
        console.log(color.cyan("Update aws profile: "));
        if (actualConfig.accessKeyId !== undefined) {
          keyIdChunk = actualConfig.accessKeyId.slice(-5);
        }
        if (actualConfig.secretAccessKey !== undefined) {
          secretAccessKeyChunk = actualConfig.secretAccessKey.slice(-5);
        }
      } else {
        program.log(color.cyan("Create new aws profile: "));
      }
      const questions = [
        {
          name: "accessKeyId",
          type: "input",
          message:
            "AWS Access Key ID" +
            (actualConfig ? `[*********${keyIdChunk}]: ` : ": ")
        },
        {
          name: "secretAccessKey",
          type: "input",
          message:
            "AWS Secret Access Key" +
            (actualConfig ? `[*********${secretAccessKeyChunk}]: ` : ": ")
        },
        {
          name: "region",
          type: "input",
          message:
            "Default region name" +
            (actualConfig ? `[${actualConfig.region}]: ` : ": ")
        }
      ];
      let inputProfile: any = await program.activeCommand.prompt(questions);
      const accessKeyId = inputProfile["accessKeyId"] || actualConfig.accessKeyId;
      const secretAccessKey = inputProfile["secretAccessKey"] || actualConfig.secretAccessKey;
      const region = inputProfile["region"] || actualConfig.region;
      profiles[args.profile] = { accessKeyId, secretAccessKey, region };
      storage.setItem("aws_profiles", profiles);
    });

  program.command("aws profile select").action(async args => {
    const questions = [
      {
        name: "selectedProfile",
        type: "list",
        message: "Select profile: ",
        choices: Object.entries(
          storage.getItem("aws_profiles") || {}
        ).map(dato => dato[0])
      }
    ];
    const response: any = await program.activeCommand.prompt(questions);
    storage.setItem("selectedProfile", response["selectedProfile"]);
  });

  program.command("aws profile which").action(async args => {
    const selProf = storage.getItem("selectedProfile");
    selProf === null
      ? program.log(color.red("You do not have a selected profile"))
      : program.log(color.green(`Your selected profile is: ${selProf}`));
  });

  program.command("aws profile get account").action(async args => {
    const config: any = await getConfig(program);
    if (config !== undefined) {
      config["apiVersion"] = "2010-05-08";
      // Create the IAM service object
      let iam = new AWS.IAM(config);

      const result = await iam.listAccountAliases({ MaxItems: 10 }).promise();
      program.log(
        color.green(`Your actual account is: ${result.AccountAliases[0]}`)
      );
    }
    return;
  });
};
