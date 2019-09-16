import fs from 'fs'
import yaml from 'js-yaml'
import Vorpal from 'vorpal'
import { execute } from '../../utils'
module.exports = (program: Vorpal) => {
  program
    .command("json2yaml", "Convert Json file or String to YAML")
    .option(
      "-f, --file <path>",
      "aws list ec2 instances for specific region or all"
    )
    .option(
      "-j, --json <jsonAsString>",
      "aws list ec2 instances for specific region or all"
    )
    .action(async (args) => {
      let jeiyam: string = "";
      if (args.options.file !== undefined) {
        jeiyam = yaml.safeDump(JSON.parse(fs.readFileSync(args.options.file).toString()));
      }
      else if (args.options.json !== undefined) {
        console.log(args.options.json);
        // jeiyam = yaml.safeDump(JSON.parse(args.options.json));
      }
      program.log(jeiyam);
});
}