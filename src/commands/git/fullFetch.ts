import color from 'chalk'
import ora from 'ora'
const spinner = ora("Loading unicorns");
import Vorpal from 'vorpal'
import { execute } from '../../utils'

const fullFetch = async (args: any) => {
  spinner.start("Getting all remote branches...")
  const { stdout, code, stderr } =  await execute(
    'git branch -r | grep -v -- "->" | while read remote;\
			do git branch --track "${remote#origin/}" "$remote"; done &&\
			git fetch --all &&\
			git pull --all'
  );
  if (code !== 0) {
    spinner.fail(color.red(stderr));
  }
  else {
    spinner.succeed(color.green(stdout));
  }
};

module.exports = (program: Vorpal) => program
  .command("git fullfetch", "Get remote branches to local repository")
  .action(fullFetch);

