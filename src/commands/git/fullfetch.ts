import { Command, flags } from "@oclif/command";
import color from "chalk";
import ora from "ora";
import { execute } from "../../utils";
const spinner = ora("Loading secrets");

export default class Ls extends Command {
  static description = "List secrets";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    try {
      spinner.start("Getting all remote branches...");
      const { stdout } = await execute(
        'git branch -r | grep -v -- "->" | while read remote;\
            do git branch --track "${remote#origin/}" "$remote" || echo "$remote already exist on local"; done &&\
            git pull --all'
      );
      spinner.succeed(color.green("Local branches already updated to remote!\n" + stdout));
    } catch (err) {
      spinner.fail(color.red(err));
    }
  }
}
