import color from 'chalk'
import Vorpal from 'vorpal'
import { dokcerFunction, Method } from './'

module.exports = (program: Vorpal) => {
  program
    .command(
      "docker clear",
      "This command stop all containers forced and remove containers, volumes, networks and images"
    )
    .option(
      "-f, --forced",
      "Is obligatory for this command because it is dangerous"
    )
    .action(async args => {
      const resp: any = await program.activeCommand.prompt([
        {
          name: 'sure',
          type: 'input',
          message: "Are you sure you want to delete all elements? (y/n)"
        }
      ]);
      if (resp.sure.toLowerCase() === "y" && args.options.forced) {
        await dokcerFunction(args, Method.stop);
        await dokcerFunction(args, Method.rmc);
        await dokcerFunction(args, Method.rmn);
        await dokcerFunction(args, Method.rmv);
        await dokcerFunction(args, Method.rmi);
      }
    });
}