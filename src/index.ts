#!/usr/bin/env node

import color from 'chalk'
import * as path from 'path'
import Vorpal from 'vorpal'
export const program = new Vorpal();
import os from 'os'
const homedir = os.homedir();
import * as pkg from '../package.json'
import { Storage } from './utils'
process.env.AWS_SDK_LOAD_CONFIG = 'false'
export const storage = new Storage(`${homedir}/.${pkg.name}/${pkg.name}.cfg`);

program.history(`${pkg.name}`);

const noargs = process.argv.slice(2).length === 0;

/**
 * ===========================================================================
 *                  Command that helps with `system` daily use
 * ============================================================================
 */

program
  .use(path.resolve(__dirname, './commands/ubuntu/restart.js'))
  .use(path.resolve(__dirname, './commands/ubuntu/shutdown.js'))


/**
 * ===========================================================================
 *                  Command that helps with `docker` daily use
 * ============================================================================
 */

program
  .use(path.resolve(__dirname, './commands/docker/rm.js'))
  .use(path.resolve(__dirname, './commands/docker/stop.js'))
  .use(path.resolve(__dirname, './commands/docker/clear.js'))

/**
 * ===========================================================================
 *                  Command that helps with `git` daily use
 * ============================================================================
 */
program
  .use(path.resolve(__dirname, './commands/git/fullFetch.js'))

/**
 * ===========================================================================
 *                  Command that helps with `aws` daily use
 * ============================================================================
 */
program
  .use(path.resolve(__dirname, './commands/aws/profiles.js'))
  .use(path.resolve(__dirname, './commands/aws/ec2.js'))
  .use(path.resolve(__dirname, './commands/aws/lambda.js'));

const listOfInteractiveCommands = [
  /aws profile select.*/,
  /aws profile config.*/
]


if (noargs) {
  program.delimiter("dops$").show().exec("help");
} else {
      try {
      listOfInteractiveCommands.forEach(regex => {
        if (process.argv.slice(2).join(" ").match(regex)) {
          program.delimiter(color.cyan("-".repeat(120))).show()
          .parse(process.argv);
        }
      });
      program.parse(process.argv);
    }
    catch (err) {
      console.error(err);
      process.exit(1);
    }
}

